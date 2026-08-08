import { auth } from "@/../auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm max-w-sm w-full text-center border border-slate-200">
          <div className="w-12 h-12 bg-cobalt-100 text-cobalt-600 rounded-full flex items-center justify-center mx-auto mb-4 font-black">NC</div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Admin Access Required</h1>
          <p className="text-slate-500 text-sm mb-6">Please sign in with your authorized Google account to view the dashboard.</p>
          <form action="/api/auth/signin">
             <Button type="submit" className="w-full">Sign In with Google</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-navy-900 text-white p-4 flex justify-between items-center px-8">
        <h1 className="font-bold tracking-tight">NComputing Admin</h1>
        <div className="flex items-center gap-4 text-sm">
          <span>{session.user?.email}</span>
          <form action="/api/auth/signout">
             <button type="submit" className="text-cobalt-300 hover:text-white transition-colors">Sign Out</button>
          </form>
        </div>
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  );
}
