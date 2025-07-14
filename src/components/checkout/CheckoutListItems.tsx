"use client";
import { OrderItemContext } from "@/hooks/OrderItemContext";
import { ICartItemWithId } from "@/types/Cart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import ListItem from "./ListItem";
import OutOfStockListItem from "./OutOfStockListItem";

export default function CheckoutListItems({
  cartItem,
  orderModal,
}: {
  cartItem: ICartItemWithId;
  orderModal: OrderModalResponse | undefined;
}) {
  return (
    <OrderItemContext.Provider value={orderModal}>
      {orderModal?.outOfStock === false ? (
        <ListItem cartItem={cartItem} orderModal={orderModal} />
      ) : (
        <OutOfStockListItem cartItem={cartItem} />
      )}
    </OrderItemContext.Provider>
  );
}
