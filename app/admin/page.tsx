import { db } from "@/db";
import { leads, orders, orderItems } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";

export default async function AdminDashboard() {
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
  
  // Basic relational fetch without needing advanced relational queries for MVP
  const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));

  return (
    <div className="container-max max-w-7xl">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900">Dashboard</h2>
        <p className="text-slate-500">Manage your leads and orders.</p>
      </div>

      <div className="space-y-12">
        
        {/* Orders Section */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            Recent Orders
            <span className="bg-cobalt-100 text-cobalt-700 text-xs px-2 py-0.5 rounded-full">{allOrders.length}</span>
          </h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="p-4 font-semibold">Order ID</th>
                    <th className="p-4 font-semibold">Customer</th>
                    <th className="p-4 font-semibold">Amount</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono text-xs text-slate-500">{order.id.slice(0, 8)}</td>
                      <td className="p-4">
                        <p className="font-semibold text-slate-900">{order.customerName}</p>
                        <p className="text-slate-500 text-xs">{order.email}</p>
                      </td>
                      <td className="p-4 font-medium">{formatPrice(Number(order.totalAmount))}</td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                          'bg-teal-100 text-teal-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {allOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">No orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Leads Section */}
        <section>
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            Demo Requests (Leads)
            <span className="bg-cobalt-100 text-cobalt-700 text-xs px-2 py-0.5 rounded-full">{allLeads.length}</span>
          </h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="p-4 font-semibold">Lead Info</th>
                    <th className="p-4 font-semibold">Company</th>
                    <th className="p-4 font-semibold">Est. Devices</th>
                    <th className="p-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50">
                      <td className="p-4">
                        <p className="font-semibold text-slate-900">{lead.name}</p>
                        <p className="text-slate-500 text-xs">{lead.email} • {lead.phone}</p>
                      </td>
                      <td className="p-4 font-medium text-slate-700">{lead.company}</td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                          {lead.expectedDevices} units
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {allLeads.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-500">No leads found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
