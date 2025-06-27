"use client";
import "@mantine/core/styles.css";
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
import OrderDetailsList from "./OrderDetailsList";

export default function CheckoutList({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const { itemsArray } = useCartContext();

  const invalid = checkIfInvalid(itemsArray, orderItems);

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
      <div className="py-5">
        <PayButton invalidOrder={invalid} />
      </div>
      <div>
        <OrderDetailsList />
      </div>
    </div>
  );
}
