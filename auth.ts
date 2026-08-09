import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // NO adapter — pure JWT session. This eliminates all DB-related Configuration errors.
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,

  providers: [
    // ── Admin: email + password from .env ─────────────────────────────────
    Credentials({
      id: "credentials",
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@ncomputing.in" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          console.error("ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
          return null;
        }

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return {
            id: "admin-001",
            email: adminEmail,
            name: "Admin",
            role: "admin",
          };
        }
        return null;
      },
    }),

    // ── Regular users: Google OAuth ────────────────────────────────────────
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  pages: {
    signIn: "/admin-login",  // custom login page (outside /admin to avoid layout redirect loop)
    error: "/admin-login",   // redirect auth errors here instead of NextAuth default error page
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Persist role in token
      if (user) {
        token.role = (user as any).role ?? "user";
        token.provider = account?.provider ?? "credentials";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        (session.user as any).role = token.role;
        (session.user as any).provider = token.provider;
      }
      return session;
    },
  },
});
