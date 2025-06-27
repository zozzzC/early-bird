"use client";
import { useCartContext } from "@/hooks/useCartContext";
import { ICart, ICartItemWithId } from "@/types/Cart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import Image from "next/image";
import CheckoutListItems from "./CheckoutListItems";
import ViewCartJsx from "../test/ViewCartJsx";
import { useEffect, useState } from "react";
import PayButton from "./PayButton";
import getModal from "@/helpers/getModal";
import checkIfInvalid from "@/helpers/checkIfInvalid";

export default function CheckoutList({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const { itemsArray } = useCartContext();

  const invalid = checkIfInvalid(itemsArray, orderItems);

  //TODO: even though the unavailable item was deleted, for some reason the state is not reset
  return (
    <div className="p-5">
      {itemsArray.map((x) => {
        return (
          <CheckoutListItems
            key={x.id}
            cartItem={x}
            orderModal={getModal(x, orderItems)}
          />
        );
      })}
      <PayButton invalidOrder={invalid} />
    </div>
  );
}
