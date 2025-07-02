"use client";
import validateCart from "@/helpers/validateCart";
import { useCartContext } from "@/hooks/useCartContext";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { Button } from "@mantine/core";

export default function ValidateCartButton({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const { items, itemsArray, editCartItem } = useCartContext();

  return (
    <>
      <Button
        onClick={() =>
          validateCart(items, itemsArray, orderItems, editCartItem)
        }
      >
        validate cart
      </Button>
    </>
  );
}
