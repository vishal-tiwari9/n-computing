"use client";

import { useCartStore } from "@/lib/cart-store";
import { toCartItem, RX300 } from "@/lib/products";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Check, Shield, Truck, Settings, Zap, Wifi, Monitor, Cpu, MemoryStick, HardDrive, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const specs = [
  { icon: <Cpu size={16} />, label: "Processor", value: "Quad-core 1.2 GHz Broadcom BCM2837 (64-bit)" },
  { icon: <MemoryStick size={16} />, label: "Memory (RAM)", value: "1 GB LPDDR2" },
  { icon: <HardDrive size={16} />, label: "Storage", value: "8 GB internal microSD" },
  { icon: <Monitor size={16} />, label: "Display Out", value: "HDMI + Composite Video" },
  { icon: <Wifi size={16} />, label: "Networking", value: "10/100 Ethernet + Wi-Fi 802.11 b/g/n" },
  { icon: <Zap size={16} />, label: "Power", value: "8W typical (vs 150W desktop)" },
  { label: "USB Ports", value: "4 × USB 2.0" },
  { label: "Bluetooth", value: "Bluetooth 4.1" },
  { label: "OS / Firmware", value: "Raspbian-based Firmware" },
  { label: "Dimensions", value: "76 × 93 × 30 mm | 92g" },
  { label: "Protocol Support", value: "vSpace Pro, RDP, Citrix, VMware" },
  { label: "Warranty", value: "3 Years Pan-India On-site" },
];

const features = [
  { icon: <Check size={16} className="text-teal-500" />, text: "Includes 1-Year vSpace Pro AMP License" },
  { icon: <Shield size={16} className="text-teal-500" />, text: "3-Year Advanced Hardware Replacement Warranty" },
  { icon: <Truck size={16} className="text-teal-500" />, text: "Free pan-India shipping within 3–5 days" },
  { icon: <Settings size={16} className="text-teal-500" />, text: "Free remote installation & setup support" },
  { icon: <Zap size={16} className="text-teal-500" />, text: "vCAST streaming for HD multimedia playback" },
  { icon: <Wifi size={16} className="text-teal-500" />, text: "Dual mode: Thin Client + Raspbian Linux Mode" },
];

export default function ProductPage() {
  const { addItem, openCart } = useCartStore();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specs">("overview");
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!session) {
      signIn("google", { callbackUrl: "/products/rx300" });
      return;
    }
    addItem(toCartItem(qty));
    openCart();
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-max py-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-cobalt-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span>Products</span>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold">NComputing RX300</span>
          </div>
        </div>
      </div>

      <div className="container-max py-10">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="bg-gradient-to-br from-navy-950 to-navy-800 p-12 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
              {/* Animated background grid */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(30,102,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,102,227,0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

              {/* Product Visual */}
              <div className="relative z-10 text-center">
                <div className="w-56 h-36 bg-navy-800 rounded-xl mx-auto shadow-2xl border border-navy-700 flex items-center justify-center mb-6 relative">
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400/60" />
                    <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="text-cobalt-400 font-mono text-2xl font-black tracking-wider">RX300</p>
                    <p className="text-navy-400 text-xs mt-1">THIN CLIENT</p>
                  </div>
                  {/* Port indicators */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-3 h-2 bg-navy-700 rounded-sm border border-navy-600" />
                    ))}
                  </div>
                </div>
                <p className="text-navy-400 text-sm font-medium">NComputing RX300 Thin Client</p>
                <p className="text-navy-500 text-xs mt-1">Based on Raspberry Pi 3</p>
              </div>

              {/* Badges */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-center gap-2">
                {["BIS Certified", "3-Year Warranty", "GST Invoice", "EMI Available"].map((badge) => (
                  <span key={badge} className="bg-white/10 text-white/70 text-xs px-2.5 py-1 rounded-full border border-white/20">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                  ✓ In Stock
                </span>
                <span className="inline-block bg-cobalt-100 text-cobalt-700 text-xs font-bold px-3 py-1 rounded-full">
                  Best Seller
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">{RX300.name}</h1>
              <p className="text-slate-500 text-base mb-6 leading-relaxed">
                {RX300.description} Works seamlessly with vSpace Pro, RDP, and Citrix — slash IT budget and energy bills instantly.
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6 p-4 bg-cobalt-50 rounded-2xl">
                <span className="text-4xl font-black text-cobalt-700">{formatPrice(RX300.price)}</span>
                <span className="text-slate-400 line-through text-xl">{formatPrice(11999)}</span>
                <span className="text-teal-700 font-bold text-sm bg-teal-100 px-2.5 py-1 rounded-lg">Save 25%</span>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-3 text-sm text-slate-700">
                    <div className="mt-0.5 shrink-0">{feature.icon}</div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Quantity + CTA */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                <div className="bg-slate-100 rounded-xl flex items-center p-1 w-full sm:w-auto">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition-all font-bold text-lg"
                  >−</button>
                  <span className="w-16 text-center font-bold text-slate-900">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-white rounded-lg transition-all font-bold text-lg"
                  >+</button>
                </div>

                <Button size="xl" className="flex-1" onClick={handleAddToCart}>
                  {session ? `Add to Cart — ${formatPrice(RX300.price * qty)}` : "Sign In to Shop"}
                </Button>
              </div>

              {!session && (
                <p className="text-xs text-slate-400 mt-3 text-center">Please sign in with Google to add items to cart</p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="border-b border-slate-200 px-8">
            <div className="flex gap-0">
              {(["overview", "specs"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-bold capitalize transition-all border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-cobalt-600 text-cobalt-700"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab === "overview" ? "Overview" : "Technical Specs"}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === "overview" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Thin Client Mode",
                    desc: "Connect to vSpace Pro, Microsoft RDS, Citrix, or VMware environments. IT admins can centrally manage all devices from vSpace Console.",
                    icon: "🖥️",
                  },
                  {
                    title: "Raspbian Linux Mode",
                    desc: "Switch to a full local Raspbian Linux desktop with access to Scratch, Python, Minecraft and thousands of Linux applications.",
                    icon: "🐧",
                  },
                  {
                    title: "vCAST Streaming",
                    desc: "Full-screen, full-motion HD multimedia playback via NComputing's vCAST technology, offloading media from the server's CPU.",
                    icon: "🎬",
                  },
                ].map((item) => (
                  <div key={item.title} className="p-6 bg-slate-50 rounded-2xl hover:bg-cobalt-50 transition-colors">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                    {spec.icon && (
                      <div className="text-cobalt-500 mt-0.5 shrink-0">{spec.icon}</div>
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{spec.label}</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { stat: "30×", label: "Devices per server", sub: "via vSpace Pro protocol" },
            { stat: "60%", label: "Average cost savings", sub: "vs traditional PC setup" },
            { stat: "8W", label: "Power consumption", sub: "vs 150W for a desktop" },
          ].map((item) => (
            <div key={item.stat} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100">
              <p className="text-4xl font-black text-cobalt-600 mb-1">{item.stat}</p>
              <p className="font-bold text-slate-900 text-sm">{item.label}</p>
              <p className="text-xs text-slate-400 mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
