import * as z from "zod";

const CartAddOn = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

export const CartItem = z.object({
  key: z.string(),
  name: z.string(),
  category: z.union([z.string(), z.null()]),
  milk: CartAddOn.nullable(),
  extra: z.array(CartAddOn).nullable(),
  size: CartAddOn.nullable(),
  price: z.number(),
  basePrice: z.number(),
  quantity: z.number(),
});

export const Cart = z.record(z.string(), CartItem);
