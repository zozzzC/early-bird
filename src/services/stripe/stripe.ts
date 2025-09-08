"use server";
import { cartItemWithIdSchema } from "@/models/CustomerDetails.model";
import { ICartItemWithId } from "@/types/Cart";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2025-08-27.basil",
});

export async function createStripeCheckout(cartItems: ICartItemWithId[]) {
  const lineItems = cartItems.map((x) => {
    return {
      price_data: {
        currency: "nzd",
        product_data: {
          name: x.name,
        },
        metadata: {},
      },
    };
  });
  try {
    cartItemWithIdSchema.validate(cartItems);
  } catch (err) {
    console.warn(
      "Error validating cart items. Cannot make Stripe checkout session.",
    );
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
  });
}
