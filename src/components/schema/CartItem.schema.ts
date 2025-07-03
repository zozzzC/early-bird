import * as z from "zod";

const CartAddOn = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

const CartItem = z.object({
  key: z.string(),
  name: z.string(),
  category: z.union([z.string(), z.null()]),
  milk: z.union([CartAddOn, z.null()]),
  extra: z.union([CartAddOn, z.null()]),
  size: z.union([z.array(CartAddOn), z.null()]),
  price: z.number(),
  basePrice: z.number(),
  quantity: z.number(),
});

