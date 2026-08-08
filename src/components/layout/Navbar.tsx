"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "../ui/Button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { items, openCart } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container-max h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-cobalt-600 flex items-center justify-center font-bold text-white tracking-tighter">
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
          <Link href="/admin" className="text-sm font-semibold text-slate-600 hover:text-cobalt-600 transition-colors">
            Admin
          </Link>
          <a href="/#contact" className="text-sm font-semibold text-slate-600 hover:text-cobalt-600 transition-colors">
            Contact
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={openCart}
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Open Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          <Button size="sm" className="hidden md:inline-flex" onClick={() => {
            const contactSection = document.getElementById('contact');
            if(contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
          }}>
            Get a Quote
          </Button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="flex flex-col p-4 gap-4">
            <Link href="/products/rx300" className="text-sm font-semibold text-slate-700 p-2" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <a href="/#solutions" className="text-sm font-semibold text-slate-700 p-2" onClick={() => setMobileMenuOpen(false)}>Solutions</a>
            <Link href="/admin" className="text-sm font-semibold text-slate-700 p-2" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
            <a href="/#contact" className="text-sm font-semibold text-slate-700 p-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}
