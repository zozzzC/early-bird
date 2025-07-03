"use client";
import validateCart from "@/helpers/validateCart";
import { useCartContext } from "@/hooks/useCartContext";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { Button } from "@mantine/core";
import { useState } from "react";

export default function ValidateCartButton({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const { items, itemsArray, editCartItem } = useCartContext();
  const [priceChanged, setPriceChanged] = useState<boolean>(false);
  const [optionsChanged, setOptionsChanged] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => {
          const { optionsChanged, priceChanged } = validateCart(
            items,
            itemsArray,
            orderItems,
            editCartItem
          );

          setOptionsChanged(optionsChanged);
          setPriceChanged(priceChanged);
        }}
      >
        validate cart
      </Button>
      <p data-testid="options-changed">{JSON.stringify(optionsChanged)}</p>
      <p data-testid="price-changed">{JSON.stringify(priceChanged)}</p>
    </>
  );
}
