"use client";

import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { createOrder } from "../../app/actions";
import Link from "next/link";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0 && status !== "success") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <p className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</p>
          <p className="text-slate-500 mb-6">Add some products before proceeding to checkout.</p>
          <Link href="/products/rx300">
            <Button className="w-full">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-200 text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-600">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3">Order Confirmed!</h1>
          <p className="text-slate-500 mb-6 leading-relaxed">
            Thank you for your purchase. Your order <span className="font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded">#{orderId?.slice(0, 8)}</span> is currently being processed. You will receive an email confirmation shortly.
          </p>
          <Link href="/">
            <Button size="lg" className="w-full" variant="secondary">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("processing");
    
    const formData = new FormData(e.currentTarget);
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const orderData = {
      customerName: formData.get("name") as string,
      email: formData.get("email") as string,
      shippingAddress: `${formData.get("address")}, ${formData.get("city")}, ${formData.get("state")} - ${formData.get("zip")}`,
      totalAmount: getTotal(),
      items: items.map(i => ({ productId: i.productId, quantity: i.quantity, price: i.price }))
    };

    const res = await createOrder(orderData);
    if (res.success) {
      setOrderId(res.orderId ?? null);
      clearCart();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container-max max-w-6xl">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-7 space-y-6">
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Contact Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input required name="name" type="text" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none" placeholder="Jane Doe" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input required name="email" type="email" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none" placeholder="jane@example.com" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address</label>
                    <input required name="address" type="text" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none" placeholder="123 Tech Park" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3 sm:col-span-1">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                      <input required name="city" type="text" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none" placeholder="Bengaluru" />
                    </div>
                    <div className="col-span-3 sm:col-span-1">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                      <input required name="state" type="text" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none" placeholder="Karnataka" />
                    </div>
                    <div className="col-span-3 sm:col-span-1">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ZIP / PIN</label>
                      <input required name="zip" type="text" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none" placeholder="560001" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3 flex items-center justify-between">
                  Payment Method
                  <Lock size={16} className="text-slate-400" />
                </h2>
                
                <div className="border-2 border-cobalt-500 rounded-xl p-4 bg-cobalt-50/30 flex items-start gap-4">
                  <div className="mt-1">
                    <input type="radio" checked readOnly className="w-4 h-4 text-cobalt-600 focus:ring-cobalt-600 border-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900">Credit / Debit Card</p>
                      <div className="flex gap-2">
                        <CreditCard size={20} className="text-slate-400" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 mb-3">Safe & secure mock payment gateway</p>
                    <div className="space-y-3">
                      <input required type="text" placeholder="Card Number" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none" defaultValue="4242 4242 4242 4242" />
                      <div className="grid grid-cols-2 gap-3">
                        <input required type="text" placeholder="MM/YY" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none" defaultValue="12/26" />
                        <input required type="text" placeholder="CVC" className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none" defaultValue="123" />
                      </div>
                    </div>
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm mt-4 text-center">There was an error processing your order. Please try again.</p>
                )}
              </div>

            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm text-slate-800">{item.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2 mb-6 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes (Included)</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-teal-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-xl font-black text-slate-900 pt-2 border-t border-slate-100 mt-2">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form" 
                size="xl" 
                className="w-full" 
                isLoading={status === "processing"}
                leftIcon={status !== "processing" && <Lock size={16} />}
              >
                {status === "processing" ? "Processing Payment..." : `Pay ${formatPrice(getTotal())}`}
              </Button>
              <p className="text-xs text-center text-slate-400 mt-4">
                Payments are securely processed in a test sandbox environment.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
