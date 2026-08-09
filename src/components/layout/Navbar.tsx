"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { ShoppingCart, Menu, X, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export function Navbar() {
  const { items, openCart } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container-max h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-cobalt-600 flex items-center justify-center font-bold text-white tracking-tighter group-hover:bg-cobalt-700 transition-colors">
            NC
          </div>
          <span className="font-black text-xl text-navy-900 tracking-tight">NComputing</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/products/rx300" className="text-sm font-semibold text-slate-600 hover:text-cobalt-600 transition-colors">
            Products
          </Link>
          <a href="/#solutions" className="text-sm font-semibold text-slate-600 hover:text-cobalt-600 transition-colors">
            Solutions
          </a>
          <a href="/#contact" className="text-sm font-semibold text-slate-600 hover:text-cobalt-600 transition-colors">
            Contact
          </a>
          {session?.user && (
            <Link href="/admin" className="text-sm font-semibold text-slate-600 hover:text-cobalt-600 transition-colors flex items-center gap-1">
              <LayoutDashboard size={14} />
              Admin
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Open Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-cobalt-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth */}
          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
          ) : session?.user ? (
            <div className="flex items-center gap-2">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-cobalt-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-cobalt-100 text-cobalt-700 flex items-center justify-center font-bold text-sm">
                  {session.user.name?.[0] || "U"}
                </div>
              )}
              <button
                onClick={() => signOut()}
                className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors"
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-cobalt-600 text-white text-sm font-semibold rounded-lg hover:bg-cobalt-700 transition-colors"
            >
              <LogIn size={15} />
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-lg">
          <div className="flex flex-col p-4 gap-1">
            <Link href="/products/rx300" className="text-sm font-semibold text-slate-700 px-3 py-2.5 rounded-lg hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <a href="/#solutions" className="text-sm font-semibold text-slate-700 px-3 py-2.5 rounded-lg hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>Solutions</a>
            <a href="/#contact" className="text-sm font-semibold text-slate-700 px-3 py-2.5 rounded-lg hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            {session?.user && (
              <Link href="/admin" className="text-sm font-semibold text-slate-700 px-3 py-2.5 rounded-lg hover:bg-slate-50 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <LayoutDashboard size={14} /> Admin
              </Link>
            )}
            <div className="mt-2 pt-2 border-t border-slate-100">
              {session?.user ? (
                <button onClick={() => signOut()} className="w-full text-sm font-semibold text-red-500 px-3 py-2.5 rounded-lg hover:bg-red-50 flex items-center gap-2">
                  <LogOut size={14} /> Sign Out
                </button>
              ) : (
                <button onClick={() => signIn("google")} className="w-full text-sm font-semibold text-cobalt-600 px-3 py-2.5 rounded-lg hover:bg-cobalt-50 flex items-center gap-2">
                  <LogIn size={14} /> Sign In with Google
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
