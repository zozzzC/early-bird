"use client";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { useCartContext } from "@/hooks/useCartContext";
import { useDisclosure } from "@mantine/hooks";
import { OrderItemContext } from "@/hooks/OrderItemContext";
import { Modal } from "@mantine/core";
import OrderItemModal from "../OrderItemModal";
import { createWriteStream } from "fs";
import CartListItem from "./CartListItem";

export default function CartList({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const cart = useCartContext();

  return (
    <>
      {cart.itemsArray.map((i, key) => {
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
