"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Zap, Shield, Server, TrendingDown,
  CheckCircle, AlertTriangle, DollarSign, Clock,
  ChevronRight, Building2, Cpu, Wifi,
} from "lucide-react";
import { DemoModal } from "@/components/marketing/DemoModal";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/cart-store";
import { toCartItem, RX300 } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

// ─── Topology SVG ─────────────────────────────────────────────────────────────
function TopologyDiagram() {
  const clientPositions = [
    { x: 340, y: 40 }, { x: 340, y: 90 }, { x: 340, y: 140 },
    { x: 340, y: 190 }, { x: 340, y: 240 }, { x: 340, y: 290 },
    { x: 340, y: 340 }, { x: 340, y: 390 },
  ];
  return (
    <svg
      viewBox="0 0 480 430"
      className="w-full max-w-md mx-auto"
      aria-label="NComputing network topology: one server powering many thin clients"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1455CB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00BFA6" stopOpacity="0.6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Server box */}
      <g transform="translate(20, 155)">
        <rect width="120" height="120" rx="12" fill="#142254" stroke="#1455CB" strokeWidth="1.5" />
        {[18, 34, 50, 66, 82, 98].map((y, i) => (
          <rect key={i} x="14" y={y} width="92" height="8" rx="2" fill="#1455CB" opacity={0.3 + i * 0.1} />
        ))}
        <rect x="14" y="18" width="40" height="8" rx="2" fill="#1455CB" opacity="0.9" />
        <circle cx="96" cy="106" r="5" fill="#00BFA6" filter="url(#glow)" />
        <text x="60" y="118" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">SERVER</text>
      </g>

      {/* Label: 1× Enterprise Server */}
      <text x="80" y="296" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">1× Server</text>
      <text x="80" y="309" textAnchor="middle" fill="#475569" fontSize="9">existing rack / cloud</text>

      {/* Connection lines */}
      {clientPositions.map((pos, i) => (
        <line
          key={i}
          x1="140" y1="215"
          x2={pos.x} y2={pos.y + 20}
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 3"
          opacity="0.7"
        />
      ))}

      {/* Thin client boxes */}
      {clientPositions.map((pos, i) => (
        <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
          <rect width="110" height="38" rx="8" fill="#0D1A40" stroke="#1455CB" strokeWidth="1" />
          <rect x="8" y="8" width="28" height="22" rx="3" fill="#1455CB" opacity="0.25" />
          <rect x="10" y="10" width="24" height="14" rx="2" fill="#1455CB" opacity="0.5" />
          <rect x="10" y="10" width="24" height="14" rx="2" fill="#1455CB" opacity="0.3" />
          <line x1="10" y1="27" x2="34" y2="27" stroke="#1455CB" strokeWidth="1.5" opacity="0.6" />
          <circle cx="42" cy="19" r="4" fill="#00BFA6" opacity="0.8" />
          <text x="52" y="16" fill="#94A3B8" fontSize="8" fontWeight="600">RX300</text>
          <text x="52" y="28" fill="#64748B" fontSize="7">Thin Client {String(i + 1).padStart(2,"0")}</text>
        </g>
      ))}

      {/* Label: Up to 30 thin clients */}
      <text x="395" y="415" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">
        Up to 30 thin clients
      </text>
      <text x="395" y="428" textAnchor="middle" fill="#475569" fontSize="9">per server</text>

      {/* "vSpace Pro" protocol label on a line */}
      <text x="235" y="205" textAnchor="middle" fill="#1455CB" fontSize="9" fontWeight="700" letterSpacing="1">
        vSpace Pro / RDP / ICA
      </text>
    </svg>
  );
}

// ─── Pain Point Card ──────────────────────────────────────────────────────────
function PainCard({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl border border-red-100 bg-red-50/50">
      <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-500 shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-slate-800">{title}</p>
        <p className="text-slate-500 text-sm mt-0.5">{detail}</p>
      </div>
    </div>
  );
}

// ─── Benefit Card ─────────────────────────────────────────────────────────────
function BenefitCard({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl border border-cobalt-100 bg-cobalt-50/50">
      <div className="w-10 h-10 rounded-xl bg-cobalt-100 flex items-center justify-center text-cobalt-600 shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-slate-800">{title}</p>
        <p className="text-slate-500 text-sm mt-0.5">{detail}</p>
      </div>
    </div>
  );
}

// ─── Testimonial Card ────────────────────────────────────────────────────────
function TestimonialCard({
  quote, name, role, company, devices,
}: {
  quote: string; name: string; role: string; company: string; devices: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col gap-4">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-slate-700 text-sm leading-relaxed flex-1">"{quote}"</p>
      <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
        <div className="w-9 h-9 rounded-full bg-cobalt-100 flex items-center justify-center text-cobalt-700 font-bold text-sm">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-slate-400 text-xs">{role}, {company}</p>
        </div>
        <span className="ml-auto text-xs bg-teal-50 text-teal-700 border border-teal-200 rounded-full px-2.5 py-1 font-semibold">
          {devices}
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddRX300 = () => {
    addItem(toCartItem(10));
    openCart();
  };

  return (
    <>
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-900"
        aria-label="Hero"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-blueprint bg-grid opacity-100" />
        <div className="absolute inset-0 bg-gradient-hero" />
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cobalt-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative container-max pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-cobalt-600/15 border border-cobalt-500/30 text-cobalt-300 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
              Trusted by 500+ Indian enterprises
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.02] tracking-tight mb-6 text-balance">
              Stop buying{" "}
              <span className="text-transparent bg-clip-text bg-gradient-cobalt">
                expensive PCs.
              </span>
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg">
              The NComputing RX300 thin client lets one server power{" "}
              <strong className="text-white">up to 30 workstations</strong> —
              cutting your IT hardware costs by up to{" "}
              <strong className="text-teal-400">60%</strong> while slashing energy
              bills and ending the PC upgrade cycle forever.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/products/rx300">
                <Button size="xl" rightIcon={<ArrowRight size={20} />}>
                  Shop RX300 — {formatPrice(8999)}
                </Button>
              </Link>
              <Button
                size="xl"
                variant="outline"
                onClick={() => setDemoOpen(true)}
                className="border-white/25 text-white hover:bg-white/10 hover:border-white/40"
              >
                Request Demo
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-5 text-slate-400 text-sm">
              {["BIS Certified", "3-Year On-site Warranty", "GST Invoice", "EMI Available"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle size={13} className="text-teal-500 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Topology Diagram */}
          <div className="hidden lg:block">
            <div className="bg-navy-800/60 border border-cobalt-600/20 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-center text-cobalt-300 text-xs font-semibold tracking-widest uppercase mb-4">
                Network Topology
              </p>
              <TopologyDiagram />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs">
          <div className="w-5 h-8 border border-slate-600 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-slate-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100">
        <div className="container-max py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x-0 lg:divide-x divide-slate-100">
            {[
              { label: "Average Savings", value: "60%", sub: "vs traditional PC setup" },
              { label: "Power Consumption", value: "8W", sub: "vs 150W desktop PC" },
              { label: "Devices per Server", value: "30×", sub: "vSpace Pro protocol" },
              { label: "Warranty Coverage", value: "3 Yrs", sub: "pan-India on-site" },
            ].map(({ label, value, sub }) => (
              <div key={label} className="px-4 text-center first:pl-0 last:pr-0">
                <p className="text-4xl font-black text-cobalt-600 tracking-tight">{value}</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM vs SOLUTION ───────────────────────────────────────────── */}
      <section id="solutions" className="section-padding bg-slate-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <p className="text-cobalt-600 text-xs font-semibold tracking-widest uppercase mb-3">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              The PC upgrade cycle is bleeding your IT budget.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Every 3-4 years, Indian companies spend ₹40,000–80,000 per seat on new
              desktop PCs — plus electricity, IT support, and e-waste disposal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pain Points */}
            <div>
              <h3 className="text-sm font-bold text-red-600 tracking-wide uppercase mb-4 flex items-center gap-2">
                <AlertTriangle size={14} /> Traditional PC Infrastructure
              </h3>
              <div className="space-y-3">
                <PainCard
                  icon={<DollarSign size={18} />}
                  title="₹60,000+ per PC, every 4 years"
                  detail="Hardware purchase, setup, AMC, and unpredictable breakdown costs add up fast."
                />
                <PainCard
                  icon={<Clock size={18} />}
                  title="IT team buried in maintenance"
                  detail="Software updates, virus scans, driver issues — each PC needs individual attention."
                />
                <PainCard
                  icon={<Zap size={18} />}
                  title="₹8,000+ annual electricity bill per PC"
                  detail="A 150W desktop PC running 8 hours a day costs thousands in energy every year."
                />
                <PainCard
                  icon={<TrendingDown size={18} />}
                  title="Data security nightmares"
                  detail="Data spread across hundreds of local hard drives. One theft = one data breach."
                />
              </div>
            </div>

            {/* NComputing Benefits */}
            <div>
              <h3 className="text-sm font-bold text-cobalt-600 tracking-wide uppercase mb-4 flex items-center gap-2">
                <CheckCircle size={14} /> NComputing Thin Client Solution
              </h3>
              <div className="space-y-3">
                <BenefitCard
                  icon={<DollarSign size={18} />}
                  title="₹8,999 per seat — one-time cost"
                  detail="No annual refresh. RX300 units last 7–10 years with no moving parts to fail."
                />
                <BenefitCard
                  icon={<Server size={18} />}
                  title="Centralised management from one console"
                  detail="Update, patch, or reimage 100 desktops in minutes from the server — zero desk visits."
                />
                <BenefitCard
                  icon={<Zap size={18} />}
                  title="Less than ₹500 electricity per year"
                  detail="At 8W, the RX300 uses 94% less power than a standard desktop PC."
                />
                <BenefitCard
                  icon={<Shield size={18} />}
                  title="All data stays on the server"
                  detail="No local storage means no data loss from theft or hardware failure. VAPT-friendly."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ──────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="bg-navy-900 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: product visual */}
            <div className="bg-navy-800 flex items-center justify-center p-12 min-h-[320px]">
              {/* SVG placeholder for RX300 */}
              <div className="relative">
                <div className="w-56 h-40 bg-navy-700 rounded-xl border border-cobalt-600/40 flex items-center justify-center shadow-cobalt-lg relative overflow-hidden">
                  <div className="absolute top-2 left-2 right-2 space-y-1.5">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-1.5 bg-cobalt-600/30 rounded-full" style={{ width: `${60 + i*8}%` }} />
                    ))}
                  </div>
                  <Cpu size={48} className="text-cobalt-500 opacity-40" />
                  <div className="absolute bottom-3 right-3 flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-cobalt-400" />
                  </div>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-3 bg-black/40 blur-md rounded-full" />
                <p className="text-center text-cobalt-300 text-xs font-mono mt-6 tracking-widest">
                  NC-RX300-IN
                </p>
              </div>
            </div>

            {/* Right: copy */}
            <div className="p-8 lg:p-12 text-white">
              <span className="text-teal-400 text-xs font-bold tracking-widest uppercase">
                Featured Product
              </span>
              <h2 className="text-3xl font-black mt-3 mb-4">
                NComputing RX300 Thin Client
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                India's most deployed thin client for desktop virtualization.
                Works with vSpace Pro, RDP, Citrix ICA, and VMware Horizon — on
                your existing server or cloud.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { icon: <Cpu size={14} />, label: "Quad-Core SoC", sub: "NComputing 1.5 GHz" },
                  { icon: <Wifi size={14} />, label: "Gigabit Ethernet", sub: "10/100/1000 RJ-45" },
                  { icon: <Zap size={14} />, label: "≤ 8W Power", sub: "94% savings vs PC" },
                  { icon: <Shield size={14} />, label: "3-Year Warranty", sub: "On-site, pan-India" },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="flex items-center gap-2 text-cobalt-300 mb-1">
                      {icon}
                      <span className="text-xs font-semibold">{label}</span>
                    </div>
                    <p className="text-slate-400 text-xs">{sub}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black text-white">{formatPrice(8999)}</span>
                <span className="text-slate-500 line-through text-lg">{formatPrice(11999)}</span>
                <span className="text-teal-400 text-sm font-bold">25% off</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/products/rx300">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ChevronRight size={16} />}
                    className="w-full sm:w-auto"
                  >
                    View Full Specs
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleAddRX300}
                  className="w-full sm:w-auto"
                >
                  Add 10 Units to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <div className="text-center mb-10">
            <p className="text-cobalt-600 text-xs font-semibold tracking-widest uppercase mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              One server. Thirty workstations.
            </h2>
          </div>
          <div className="max-w-md mx-auto lg:max-w-none lg:flex lg:gap-12 lg:items-center">
            <div className="lg:flex-1">
              <TopologyDiagram />
            </div>
            <div className="lg:flex-1 mt-8 lg:mt-0 space-y-6">
              {[
                {
                  n: "01", title: "Your existing server runs vSpace Pro",
                  body: "Install the NComputing vSpace Pro software on any Windows Server or Linux box — existing hardware qualifies in most cases.",
                },
                {
                  n: "02", title: "RX300 units connect over Ethernet",
                  body: "Plug in the RX300 via Gigabit Ethernet. The unit boots in seconds and presents a full desktop session from the server.",
                },
                {
                  n: "03", title: "Centralise management in one console",
                  body: "Push software updates, assign desktop policies, and monitor all sessions from a single vSpace Pro web dashboard.",
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-cobalt-600 text-white font-black text-sm flex items-center justify-center shrink-0 font-mono">
                    {n}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{title}</p>
                    <p className="text-slate-500 text-sm mt-1">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-10">
            <p className="text-cobalt-600 text-xs font-semibold tracking-widest uppercase mb-3">
              Customer Stories
            </p>
            <h2 className="text-3xl font-black text-slate-900">
              Companies already saving with NComputing
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="We replaced 120 PCs across our Mumbai and Pune offices with NComputing RX300 units. Hardware costs dropped by ₹48 lakhs and our server room AC bill halved."
              name="Priya Desai"
              role="CTO"
              company="Finserv Solutions Pvt Ltd"
              devices="120 devices"
            />
            <TestimonialCard
              quote="Deployment took 2 days. Managing 80 thin clients is easier than managing 10 PCs was before. The centralised console is genuinely great."
              name="Arun Kumar"
              role="IT Manager"
              company="Jain Manufacturing Ltd"
              devices="80 devices"
            />
            <TestimonialCard
              quote="For a BPO with 200 seats, the RX300 was a no-brainer. We're saving ₹70,000/month on electricity alone. ROI was under 14 months."
              name="Meera Pillai"
              role="Operations Head"
              company="DataVision BPO Services"
              devices="200 devices"
            />
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section id="contact" className="section-padding bg-navy-900">
        <div className="absolute inset-0 bg-blueprint bg-grid opacity-50 pointer-events-none" />
        <div className="container-max relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Ready to cut IT costs by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-cobalt">60%?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Get a free ROI analysis for your business. Our engineers will calculate
              exact savings based on your current PC count and energy tariff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                onClick={() => setDemoOpen(true)}
                rightIcon={<ArrowRight size={20} />}
              >
                Book a Free Demo
              </Button>
              <Link href="/products/rx300">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 hover:border-white/40"
                >
                  Shop RX300 Now
                </Button>
              </Link>
            </div>
            <p className="text-slate-500 text-sm mt-6">
              Bulk pricing available for orders of 25+ units.{" "}
              <a
                href="mailto:sales@ncomputing.in"
                className="text-cobalt-300 hover:text-cobalt-200 underline"
              >
                Contact sales directly →
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}