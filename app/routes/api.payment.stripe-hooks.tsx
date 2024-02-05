import { type ActionFunctionArgs } from "@vercel/remix";
import type Stripe from "stripe";
import { type Metadata, processPayment } from "~/lib/payment.server";
import { stripe } from "~/lib/stripe";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.text();
  const signature = request.headers.get("Stripe-Signature") as string;
  if (!signature) {
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const stripeSigningSecret = process.env.STRIPE_SIGNING_SECRET as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeSigningSecret
    );

    const completedEvent = event.data.object as Stripe.Checkout.Session & {
      metadata: Metadata;
    };

    if (event.type === "checkout.session.completed") {
      if (completedEvent.mode === "payment") {
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          completedEvent.id,
          {
            expand: ["line_items"],
          }
        );
        if (!sessionWithLineItems.line_items) {
          throw new Error("No line items found");
        }
        await processPayment({
          userId: completedEvent.metadata.userId,
          proTier: completedEvent.metadata.proTier,
          amount: sessionWithLineItems.line_items.data[0].amount_total,
        });
      }
    }
    return new Response(JSON.stringify({ success: true, error: null }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        error: (error as { message: string }).message,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
