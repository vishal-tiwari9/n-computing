import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string | null) {
  try {
    await resend.emails.send({
      from: "Buddy2Buddy <hello@buddy2buddy.xyz>",
      to: email,
      subject: "Welcome to NComputing!",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1 style="color: #0E3EB5;">Welcome ${name || ""}!</h1>
          <p>We are thrilled to have you onboard.</p>
          <p>Start exploring the revolutionary NComputing RX300 thin client to cut your IT hardware costs by up to 60%.</p>
          <br/>
          <p>Cheers,<br/>The NComputing India Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

export async function sendOrderConfirmationEmail(email: string, orderId: string, amount: string) {
  try {
    await resend.emails.send({
      from: "Buddy2Buddy <hello@buddy2buddy.xyz>",
      to: email,
      subject: `Order Confirmation - #${orderId.slice(0, 8)}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1 style="color: #0E3EB5;">Order Received!</h1>
          <p>Thank you for your purchase.</p>
          <p>Your order ID is <strong>${orderId}</strong>.</p>
          <p>Total Amount: <strong>₹${amount}</strong></p>
          <p>We will notify you once your order has shipped.</p>
          <br/>
          <p>Cheers,<br/>The NComputing India Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
  }
}
