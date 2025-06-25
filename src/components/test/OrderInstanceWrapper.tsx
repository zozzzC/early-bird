"use client";
import { OrderInstanceContext } from "@/hooks/OrderInstanceContext";
import { ICart, ICartItem, OrderInstanceType } from "@/types/Cart";
import { useState } from "react";

export default function OrderInstanceWrapper({
  children,
  instance,
  resetInstance,
}: {
  children: React.ReactNode;
  instance?: ICartItem;
  resetInstance?: boolean;
}) {
  const [orderInstance, setOrderInstance] = useState<ICartItem>(
    instance
      ? instance
      : ({
          key: "1c1f97ca-4876-81bc-bd7d-ef471bc0a6ab",
          name: "Americano",
          category: "hot",
          size: null,
          milk: null,
          extra: null,
          price: 4.5,
          quantity: 1,
        } as ICartItem)
  );

  function setOrderInstanceByField<T extends "milk" | "size" | "extra">({
    field,
    value,
  }: {
    field: T;
    value: OrderInstanceType<T>;
  }): void {
    const newOrderInstance = orderInstance;
    newOrderInstance[field] = value as ICartItem[typeof field];
    if (resetInstance) {
      setOrderInstance(newOrderInstance);
    }
  }

  return (
    <OrderInstanceContext.Provider
      value={{ orderInstance, setOrderInstanceByField }}
    >
      {children}
    </OrderInstanceContext.Provider>
  );
}
