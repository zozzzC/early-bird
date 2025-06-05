"use client";
import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";
import { Button } from "@mantine/core";

export default function CartButton() {
  const orderInstance = useOrderInstanceContext();

  return (
    <>
      <Button onClick={() => console.log(JSON.stringify(orderInstance))}>
        add to cart
      </Button>
    </>
  );
}
