import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      // In a production MVP, you might restrict to certain emails or domains:
      // if (user.email?.endsWith("@ncomputing.com")) return true;
      // return false;
      
      // For this sandbox MVP, we allow any Google login to access the dashboard.
      return true;
    },
  },
});
