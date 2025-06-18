"use client";
import { CartContext } from "@/hooks/CartContext";
import { Cart } from "@/helpers/Cart";
import { useState } from "react";
import { ICart } from "@/types/Cart";

//NOTE: This had to be made into a seperate use-client component because we cannot do this directly in the server component (see below error)
//Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
export default function CartProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = new Cart();
  const [c, setCart] = useState<Cart>(cart);
  //cart is used for when we want to call actions onto the cart
  return <CartContext value={{ cart, c, setCart }}>{children}</CartContext>;
}
