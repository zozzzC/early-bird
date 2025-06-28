"use client";
import { useCartContext } from "@/hooks/useCartContext";
import { ICartItem } from "@/types/Cart";

export default function useDefaultSelection(
  orderHash: string | undefined | null
): undefined | ICartItem {
  const { getOrderInstanceByHash } = useCartContext();
  if (orderHash) {
    return getOrderInstanceByHash(orderHash);
  }
}
