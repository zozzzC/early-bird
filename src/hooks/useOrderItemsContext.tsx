"use client";

import { useContext } from "react";
import { OrderItemContext } from "./OrderItemContext";

export const useOrderItemsContext = () => {
  const orderItems = useContext(OrderItemContext);
  if (orderItems === undefined) {
    throw new Error("Order Items Context must be wrapped in a provider.");
  }
  return orderItems;
};
