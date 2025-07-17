"use client";
import { OrderItemsContext } from "@/hooks/OrderItemsContext";
import { OrderModalResponse } from "@/types/OrderModalResponse";

export default function OrderItemsComponent({
  orderItems,
  children,
}: {
  orderItems: OrderModalResponse[];
  children: React.ReactNode;
}) {
  return (
    <OrderItemsContext value={{ orderItems: orderItems }}>
      {children}
    </OrderItemsContext>
  );
}
