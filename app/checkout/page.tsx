"use client";

import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { createOrder } from "../../app/actions";
import Link from "next/link";
import { ShieldCheck, Lock, Package, Truck, CheckCircle2 } from "lucide-react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0 && status !== "success") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-sm text-center max-w-md w-full border border-slate-200">
          <Package className="mx-auto text-slate-300 mb-4" size={48} />
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
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg w-full">
          <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-teal-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3">Order Confirmed!</h1>
          <p className="text-slate-500 mb-2 leading-relaxed">
            Your order <span className="font-mono font-bold text-cobalt-600 bg-cobalt-50 px-2 py-0.5 rounded">#{orderId?.slice(0, 8).toUpperCase()}</span> has been placed.
          </p>
          <p className="text-slate-400 text-sm mb-8">A confirmation email has been sent to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button variant="secondary" className="w-full">Return Home</Button>
            </Link>
            <Link href="/products/rx300" className="flex-1">
              <Button className="w-full">Shop More</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("processing");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const phone = fd.get("phone") as string;
    const address = fd.get("address") as string;
    const city = fd.get("city") as string;
    const state = fd.get("state") as string;
    const zip = fd.get("zip") as string;

    const total = getTotal();

    try {
      // Create Razorpay order on backend
      const rpRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      if (!rpRes.ok) throw new Error("Failed to create payment order");

      const { orderId: razorpayOrderId } = await rpRes.json();

      // Open Razorpay modal
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Sc6cyZd9jg6z0g",
        amount: total * 100,
        currency: "INR",
        name: "NComputing India",
        description: "NComputing RX300 Thin Client",
        order_id: razorpayOrderId,
        prefill: { name, email, contact: phone },
        theme: { color: "#1455CB" },
        handler: async (response: any) => {
          // Payment successful — create order in DB
          const orderData = {
            customerName: name,
            email,
            phone,
            shippingAddress: `${address}, ${city}, ${state} - ${zip}`,
            totalAmount: total,
            razorpayOrderId,
            razorpayPaymentId: response.razorpay_payment_id,
            items: items.map((i) => ({ productName: i.name, quantity: i.quantity, price: i.price })),
          };

          const res = await createOrder(orderData);
          if (res.success) {
            setOrderId(res.orderId ?? null);
            clearCart();
            setStatus("success");
          } else {
            setStatus("error");
          }
        },
        modal: {
          ondismiss: () => {
            setStatus("idle");
          },
        },
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  const inputClass =
    "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-100 outline-none transition-all bg-white placeholder:text-slate-400";
  const labelClass = "block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide";

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 py-4">
          <div className="container-max max-w-6xl flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cobalt-600 flex items-center justify-center font-bold text-white text-sm">NC</div>
              <span className="font-black text-navy-900 text-lg">NComputing</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Lock size={14} />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border-b border-slate-100 py-3">
          <div className="container-max max-w-6xl">
            <div className="flex items-center gap-6 text-xs font-semibold">
              {["Cart", "Checkout", "Confirmation"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i <= 1 ? "bg-cobalt-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                    {i + 1}
                  </div>
                  <span className={i <= 1 ? "text-cobalt-700" : "text-slate-400"}>{step}</span>
                  {i < 2 && <div className="w-8 h-px bg-slate-200 ml-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container-max max-w-6xl py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-7 space-y-6">
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-5">

                {/* Contact */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cobalt-100 text-cobalt-700 text-xs flex items-center justify-center font-bold">1</span>
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input required name="name" type="text" className={inputClass} placeholder="Rahul Sharma" />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input required name="email" type="email" className={inputClass} placeholder="rahul@company.com" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Phone Number</label>
                      <input required name="phone" type="tel" className={inputClass} placeholder="+91 98765 43210" />
                    </div>
                  </div>
                </div>

                {/* Shipping */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h2 className="text-base font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cobalt-100 text-cobalt-700 text-xs flex items-center justify-center font-bold">2</span>
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Street / Building</label>
                      <input required name="address" type="text" className={inputClass} placeholder="123, Tech Park, Electronic City" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className={labelClass}>City</label>
                        <input required name="city" type="text" className={inputClass} placeholder="Bengaluru" />
                      </div>
                      <div>
                        <label className={labelClass}>State</label>
                        <input required name="state" type="text" className={inputClass} placeholder="Karnataka" />
                      </div>
                      <div>
                        <label className={labelClass}>PIN Code</label>
                        <input required name="zip" type="text" className={inputClass} placeholder="560100" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cobalt-100 text-cobalt-700 text-xs flex items-center justify-center font-bold">3</span>
                    Secure Payment
                  </h2>
                  <p className="text-sm text-slate-500 ml-8">Powered by Razorpay. Clicking "Pay Now" will open a secure payment window where you can use cards, UPI, net banking, or wallets.</p>
                  <div className="mt-4 ml-8 flex flex-wrap gap-2">
                    {["Visa", "Mastercard", "UPI", "Net Banking", "Wallets"].map((m) => (
                      <span key={m} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">{m}</span>
                    ))}
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm text-center bg-red-50 border border-red-100 rounded-xl py-3">
                    There was an error processing your order. Please try again.
                  </p>
                )}
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
                <h2 className="text-base font-bold text-slate-900 mb-5">Order Summary</h2>

                <div className="space-y-4 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cobalt-50 flex items-center justify-center flex-shrink-0">
                          <Package size={18} className="text-cobalt-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-800">{item.name}</p>
                          <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-slate-900 text-sm whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2.5 mb-6 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>GST (Included)</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping</span>
                    <span className="text-teal-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-black text-slate-900 pt-3 border-t border-slate-200">
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
                  leftIcon={status !== "processing" ? <Lock size={16} /> : undefined}
                >
                  {status === "processing" ? "Opening Payment..." : `Pay ${formatPrice(getTotal())}`}
                </Button>

                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><ShieldCheck size={12} /> SSL Encrypted</span>
                  <span className="flex items-center gap-1"><Truck size={12} /> Free Delivery</span>
                </div>

                {/* Trust badges */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
                  <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-5 opacity-40" />
                  <span className="text-xs text-slate-400">Secured by Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
