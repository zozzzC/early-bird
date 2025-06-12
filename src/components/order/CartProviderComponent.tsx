"use client";
import { CartContext } from "@/hooks/CartContext";
import { Cart } from "@/helpers/Cart";

//NOTE: This had to be made into a seperate use-client component because we cannot do this directly in the server component (see below error)
//Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
export default function CartProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = new Cart();
  return <CartContext value={cart}>{children}</CartContext>;
}
