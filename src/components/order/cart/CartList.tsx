"use client";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { useCartContext } from "@/hooks/useCartContext";
import { useDisclosure } from "@mantine/hooks";
import { OrderItemContext } from "@/hooks/OrderItemContext";
import { Modal } from "@mantine/core";
import OrderItemModal from "../OrderItemModal";
import { createWriteStream } from "fs";
import CartListItem from "./CartListItem";
import { useEffect, useState } from "react";
import { ICart } from "@/types/Cart";
import { Cart } from "@/helpers/Cart";

export default function CartList({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const {c, setCart} = useCartContext();

  //if the cart is changed for any reason, then update the cartState

  


  //TODO: orderHash can change, and in the case that it does we must rerender, so the orderHashes and the cart should probably be in some sort of state
  return (
    <>
      {c.itemsArray.map((i, key) => {
        const orderModalResponse = orderItems.find(
          (x) => (x.key as string) === (i.key as string)
        );

        console.log("cart Item: " + i.name + i.id);

        return (
          <div key={key}>
            {orderModalResponse ? (
              <CartListItem
                orderModalResponse={orderModalResponse}
                orderInstance={i}
                orderHash={i.id}
              />
            ) : (
              JSON.stringify(i.key)
            )}
          </div>
        );
      })}
    </>
  );
}
