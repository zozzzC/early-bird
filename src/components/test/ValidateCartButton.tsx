"use client";
import validateCart from "@/helpers/validateCart";
import { useCartContext } from "@/hooks/useCartContext";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { Button } from "@mantine/core";
import { useState } from "react";

export default function ValidateCartButton({
  orderItems,
  pay,
}: {
  orderItems: OrderModalResponse[];
  pay: boolean;
}) {
  const { items, setItems, itemsArray, setItemsArray, editCartItem } =
    useCartContext();
  const [priceChanged, setPriceChanged] = useState<boolean>(false);
  const [optionsChanged, setOptionsChanged] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => {
          let validate = null;
          if (pay) {
            validate = validateCart(
              items,
              itemsArray,
              orderItems,
              editCartItem
            );
          } else {
            //this is when we intialize the cart (load from localStorage)
            validate = validateCart(items, itemsArray, orderItems);
          }

          setItems(validate.items);
          setItemsArray(validate.itemsArray);

          setOptionsChanged(validate.optionsChanged);
          setPriceChanged(validate.priceChanged);
        }}
      >
        validate cart
      </Button>
      <p data-testid="options-changed">{JSON.stringify(optionsChanged)}</p>
      <p data-testid="price-changed">{JSON.stringify(priceChanged)}</p>
    </>
  );
}
