import { auth } from "@/../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, Users } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Typed user object to eliminate the explicit 'any' error
  const user = session?.user as { role?: string } | undefined;

  // Strict check: must be authenticated AND have admin role
  if (!session || user?.role !== "admin") {
    redirect("/admin-login");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-navy-900 text-white flex flex-col shrink-0 min-h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-navy-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cobalt-600 flex items-center justify-center font-black text-sm">NC</div>
            <div>
              <p className="font-black text-sm tracking-tight">NComputing</p>
              <p className="text-navy-400 text-[10px]">Admin Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-cobalt-600/20 hover:bg-cobalt-600/30 transition-colors"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-navy-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Package size={16} />
            Orders
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-navy-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Users size={16} />
            Leads
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}