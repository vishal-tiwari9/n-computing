"use client";

import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/Button";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal } = useCartStore();
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ShoppingBag size={20} className="text-cobalt-600" />
            Your Cart
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <ShoppingBag size={32} />
              </div>
              <div>
                <p className="text-slate-900 font-semibold text-lg">Your cart is empty</p>
                <p className="text-slate-500 text-sm mt-1">Looks like you haven't added any products yet.</p>
              </div>
              <Button variant="outline" onClick={closeCart}>Continue Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-2">
                  <div className="w-full h-full bg-navy-900 rounded-lg relative overflow-hidden flex items-center justify-center">
                    <span className="text-cobalt-500 font-mono text-[10px] absolute">RX300</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm leading-tight">{item.name}</h3>
                      <p className="text-cobalt-600 font-bold mt-1">{formatPrice(item.price)}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 p-6 bg-slate-50">
            <div className="flex justify-between text-slate-500 text-sm mb-2">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900">{formatPrice(getTotal())}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-sm mb-4">
              <span>Shipping</span>
              <span className="text-teal-600 font-medium">Free</span>
            </div>
            <div className="flex justify-between text-lg font-black text-slate-900 mb-6">
              <span>Total</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            
            <Button 
              size="xl" 
              className="w-full"
              onClick={() => {
                closeCart();
                router.push('/checkout');
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
