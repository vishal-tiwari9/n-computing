import type { CartItem } from "@/types";

export interface ProductSpec {
  label: string;
  value: string;
  category?: string;
}

export interface ProductData {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice: number;
  discount: number;
  description: string;
  shortDescription: string;
  imageUrl: string;
  specs: ProductSpec[];
  highlights: { icon: string; label: string; value: string }[];
  stock: number;
}

export const RX300: ProductData = {
  id: "NC-RX300-IN",
  name: "NComputing RX300 Thin Client",
  sku: "NC-RX300-IN",
  price: 8999,
  originalPrice: 11999,
  discount: 25,
  shortDescription:
    "Ultra-low-cost thin client for Indian enterprises — 8W power, Gigabit Ethernet, dual USB 3.0, 3-year on-site warranty.",
  description:
    "The NComputing RX300 is India's most cost-effective thin client for corporate desktop virtualisation. Replace expensive PCs at ₹8,999 per seat with a unit that consumes less than 8W of power, requires zero local maintenance, and delivers a full Windows or Linux desktop experience via your existing server infrastructure.",
  imageUrl: "/images/rx300.svg",
  stock: 500,
  highlights: [
    { icon: "zap", label: "Power Draw", value: "≤ 8W" },
    { icon: "server", label: "Protocol", value: "RDP / ICA / vSpace" },
    { icon: "shield", label: "Warranty", value: "3 Yr On-site" },
    { icon: "wifi", label: "Network", value: "Gigabit Ethernet" },
  ],
  specs: [
    { label: "Processor", value: "NComputing SoC Quad-Core 1.5 GHz", category: "Core Hardware" },
    { label: "RAM", value: "2 GB DDR3L", category: "Core Hardware" },
    { label: "Storage", value: "8 GB eMMC Flash", category: "Core Hardware" },
    { label: "Operating System", value: "NOS (NComputing OS, Linux-based)", category: "Core Hardware" },
    { label: "Display Output", value: "1× HDMI 1.4 — up to 1920×1080 @ 60 Hz", category: "Display" },
    { label: "Audio Out", value: "3.5 mm Line Out", category: "Display" },
    { label: "Mic In", value: "3.5 mm Mic", category: "Display" },
    { label: "USB 2.0", value: "4 ports", category: "Connectivity" },
    { label: "USB 3.0", value: "2 ports", category: "Connectivity" },
    { label: "Ethernet", value: "Gigabit RJ-45 (10/100/1000)", category: "Connectivity" },
    { label: "Wi-Fi", value: "802.11 b/g/n (optional module)", category: "Connectivity" },
    { label: "Power Consumption", value: "≤ 8 W typical", category: "Power & Physical" },
    { label: "Power Supply", value: "12 V DC External Adapter (included)", category: "Power & Physical" },
    { label: "Dimensions", value: "135 × 135 × 28 mm", category: "Power & Physical" },
    { label: "Weight", value: "0.32 kg", category: "Power & Physical" },
    { label: "Operating Temp", value: "0 °C – 45 °C", category: "Power & Physical" },
    { label: "Certifications", value: "CE, FCC, RoHS, BIS (India)", category: "Compliance" },
    { label: "Warranty", value: "3 Years On-site Support across India", category: "Compliance" },
  ],
};

export function toCartItem(qty: number = 1): CartItem {
  return {
    productId: RX300.id,
    name: RX300.name,
    price: RX300.price,
    quantity: qty,
    imageUrl: RX300.imageUrl,
    sku: RX300.sku,
  };
}
