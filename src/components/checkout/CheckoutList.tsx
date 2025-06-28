"use client";
import { useCartContext } from "@/hooks/useCartContext";
import { ICartItemWithId } from "@/types/Cart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import CheckoutListItems from "./CheckoutListItems";

export default function CheckoutList({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const { itemsArray } = useCartContext();
  console.log(itemsArray);

  function getModal(
    orderItem: ICartItemWithId,
    orderItems: OrderModalResponse[]
  ): OrderModalResponse | undefined {
    return orderItems.find((x) => {
      return x.key === orderItem.key;
    });
  }

  return (
    <div>
      {itemsArray.map((x) => {
        return (
          <CheckoutListItems
            key={x.id}
            cartItem={x}
            orderModal={getModal(x, orderItems)}
          />
        );
      })}
    </div>
  );
}
