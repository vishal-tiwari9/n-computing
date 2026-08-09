"use server";

import { db } from "@/db";
import { leads, orders, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function submitLead(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      expectedDevices: parseInt(formData.get("devices") as string) || 0,
      message: formData.get("message") as string,
    };

    if (!data.name || !data.email) {
      return { success: false, error: "Missing required fields" };
    }

    await db.insert(leads).values(data);
    return { success: true };
  } catch (error) {
    console.error("Lead submission error:", error);
    return { success: false, error: "Failed to submit request" };
  }
}

export async function createOrder(data: {
  customerName: string;
  email: string;
  phone?: string;
  shippingAddress: string;
  totalAmount: number;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  items: { productName: string; quantity: number; price: number }[];
}) {
  try {
    if (!data.customerName || !data.email || !data.shippingAddress || !data.items || data.items.length === 0) {
      return { success: false, error: "Invalid order data" };
    }

    const [newOrder] = await db.insert(orders).values({
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      shippingAddress: data.shippingAddress,
      totalAmount: data.totalAmount.toString(),
      razorpayOrderId: data.razorpayOrderId,
      razorpayPaymentId: data.razorpayPaymentId,
      status: "Pending",
    }).returning({ id: orders.id });

    const itemsToInsert = data.items.map((item) => ({
      orderId: newOrder.id,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price.toString(),
    }));

    await db.insert(orderItems).values(itemsToInsert);

    // Send confirmation email (non-blocking)
    sendOrderConfirmationEmail(data.email, newOrder.id, data.totalAmount.toLocaleString("en-IN")).catch(console.error);

    return { success: true, orderId: newOrder.id };
  } catch (error) {
    console.error("Order creation error:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function updateOrderStatus(orderId: string, status: "Pending" | "Processing" | "Shipped" | "Delivered") {
  try {
    await db.update(orders).set({ status }).where(eq(orders.id, orderId));
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { success: false, error: "Update failed" };
  }
}
