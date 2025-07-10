"use client";
import validateCart from "@/helpers/validateCart";
import { ICart, ICartItemWithId } from "@/types/Cart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { useEffect, useState } from "react";
import { useCartContext } from "./useCartContext";

export const useValidateCart = (
  items: ICart,
  itemsArray: ICartItemWithId[],
  orderItems: OrderModalResponse[]
): { priceChanged: boolean; optionsChanged: boolean } => {
  const { setItems, setItemsArray } = useCartContext();
  const [priceChanged, setPriceChanged] = useState<boolean>(false);
  const [optionsChanged, setOptionsChanged] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("items")) {
      const validate = validateCart(
        JSON.parse(localStorage.getItem("items") as string) as ICart,
        JSON.parse(
          localStorage.getItem("itemsArray") as string
        ) as ICartItemWithId[],
        orderItems
      );

      setItems(validate.items);
      setItemsArray(validate.itemsArray);
      setPriceChanged(validate.priceChanged);
      setOptionsChanged(validate.optionsChanged);
    }
  }, []);

  return { priceChanged, optionsChanged };
};
