import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-navy-800 text-slate-400 py-12">
      <div className="container-max grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-cobalt-600 flex items-center justify-center font-bold text-white text-xs tracking-tighter">
              NC
            </div>
            <span className="font-black text-lg text-white tracking-tight">NComputing</span>
          </Link>
          <p className="text-sm max-w-sm mb-6">
            Leading the industry in Desktop Virtualization and Thin Client solutions. 
            Empowering businesses in India with cost-effective, scalable, and secure IT infrastructure.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4">Products</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products/rx300" className="hover:text-cobalt-400 transition-colors">RX300 Thin Client</Link>
            </li>
            <li>
              <a href="#" className="hover:text-cobalt-400 transition-colors">vSpace Pro Server</a>
            </li>
            <li>
              <a href="#" className="hover:text-cobalt-400 transition-colors">EX500 Thin Client</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-cobalt-400 transition-colors">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-cobalt-400 transition-colors">Contact Sales</a>
            </li>
            <li>
              <Link href="/admin" className="hover:text-cobalt-400 transition-colors">Admin Login</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container-max mt-12 pt-8 border-t border-navy-800 text-xs flex flex-col md:flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} NComputing India. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
