"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitLead } from "../../../app/actions";

export function DemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!isOpen) return null;

  async function action(formData: FormData) {
    setStatus("loading");
    const res = await submitLead(formData);
    if (res.success) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2"
        >
          ✕
        </button>
        
        <div className="p-8">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Book a Free ROI Analysis</h2>
          <p className="text-slate-500 mb-6 text-sm">
            See how NComputing can save you up to 60% on your IT hardware budget.
          </p>

          {status === "success" ? (
            <div className="bg-teal-50 text-teal-800 p-6 rounded-xl border border-teal-100 text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 text-teal-600 text-xl font-bold">✓</div>
              <p className="font-semibold text-lg">Request Received!</p>
              <p className="text-sm mt-2 opacity-80">Our sales engineers will contact you within 24 hours.</p>
              <Button onClick={onClose} className="mt-6 w-full" variant="outline">Close</Button>
            </div>
          ) : (
            <form action={action} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input required name="name" type="text" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none transition-all" placeholder="Priya Desai" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company</label>
                  <input required name="company" type="text" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none transition-all" placeholder="Acme Corp" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
                  <input required name="email" type="email" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none transition-all" placeholder="priya@acme.in" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none transition-all" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Device Count</label>
                <select name="devices" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none transition-all bg-white">
                  <option value="10">1 - 20 devices</option>
                  <option value="50">21 - 100 devices</option>
                  <option value="200">101 - 500 devices</option>
                  <option value="1000">500+ devices</option>
                </select>
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm">Failed to submit request. Please try again.</p>
              )}

              <Button type="submit" isLoading={status === "loading"} className="w-full mt-2" size="lg">
                Submit Request
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
