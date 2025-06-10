"use client";
import { useCartContext } from "@/hooks/useCartContext";
import { CartContext } from "@/hooks/CartContext";
import { Cart } from "@/helpers/Cart";

export default function CartProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = new Cart();
  return <CartContext value={cart}>{children}</CartContext>;
}
