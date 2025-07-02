"use client";

import { useCartContext } from "@/hooks/useCartContext";
import { ICartItem } from "@/types/Cart";
import { Button } from "@mantine/core";

export default function GetItemHashButton({
  cartItem,
}: {
  cartItem: ICartItem;
}) {
  const { getCartItemId } = useCartContext();

  return (
    <>
      <Button onClick={() => getCartItemId(cartItem)}>get cart item id</Button>
    </>
  );
}
