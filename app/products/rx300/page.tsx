"use client";

import { useCartStore } from "@/lib/cart-store";
import { toCartItem, RX300 } from "@/lib/products";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Check, Shield, Truck, Settings } from "lucide-react";
import { useState } from "react";

export default function ProductPage() {
  const { addItem, openCart } = useCartStore();
  const [qty, setQty] = useState(10);

  const handleAddToCart = () => {
    addItem(toCartItem(qty));
    openCart();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-max">
        
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500 mb-8 flex gap-2">
          <a href="/" className="hover:text-cobalt-600">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-cobalt-600">Products</a>
          <span>/</span>
          <span className="text-slate-900 font-medium">RX300</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Gallery */}
            <div className="bg-slate-50 p-12 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200 min-h-[400px]">
              <div className="relative w-full max-w-sm aspect-square bg-white rounded-2xl border border-slate-200 shadow-md flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-32 bg-navy-900 rounded-lg mx-auto shadow-xl relative overflow-hidden flex items-center justify-center mb-4">
                     <span className="text-cobalt-500 font-mono text-xl absolute">RX300</span>
                     <div className="absolute top-2 right-2 flex gap-1">
                       <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"/>
                     </div>
                  </div>
                  <p className="text-slate-400 font-mono text-sm">Product Render</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full w-max mb-4">
                In Stock
              </span>
              
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">{RX300.name}</h1>
              <p className="text-slate-500 text-lg mb-6 leading-relaxed">
                {RX300.description} Works seamlessly with vSpace Pro, RDP, and Citrix. Slash your IT budget and energy costs instantly.
              </p>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-cobalt-600">{formatPrice(RX300.price)}</span>
                <span className="text-slate-400 line-through text-xl">{formatPrice(11999)}</span>
                <span className="text-teal-600 font-bold text-sm bg-teal-50 px-2 py-1 rounded">25% OFF</span>
              </div>

              <div className="space-y-4 mb-8 border-y border-slate-100 py-6">
                {[
                  { icon: <Check size={18} className="text-teal-500"/>, text: "Includes 1-Year vSpace Pro AMP License" },
                  { icon: <Shield size={18} className="text-teal-500"/>, text: "3-Year Advanced Hardware Replacement Warranty" },
                  { icon: <Truck size={18} className="text-teal-500"/>, text: "Free pan-India shipping within 3-5 days" },
                  { icon: <Settings size={18} className="text-teal-500"/>, text: "Free remote installation support" },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-3 text-slate-700">
                    <div className="mt-0.5 shrink-0">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl flex items-center p-1">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"
                  >-</button>
                  <span className="w-16 text-center font-semibold">{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"
                  >+</button>
                </div>
                
                <Button size="xl" className="w-full" onClick={handleAddToCart}>
                  Add to Cart — {formatPrice(RX300.price * qty)}
                </Button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
