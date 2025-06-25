"use client";
import { useCartContext } from "@/hooks/useCartContext";
import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";
import { Button } from "@mantine/core";

export default function CartButton(): React.ReactNode {
  const { orderInstance } = useOrderInstanceContext();
  const { addCartItem } = useCartContext();

  return (
    <>
      <Button
        role="add-to-cart"
        onClick={() => {
          if (orderInstance != null) {
            addCartItem(orderInstance);
          }
        }}
      >
        add to cart
      </Button>

    </>
  );
}
