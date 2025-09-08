"use client";
import defaultInstance from "@/__tests__/sample/defaultInstance.json";
import { OrderInstanceContext } from "@/hooks/OrderInstanceContext";
import { ICartItem, OrderInstanceType } from "@/types/Cart";
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
    instance ? instance : (defaultInstance as ICartItem),
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
