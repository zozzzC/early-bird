"use client";

import { useContext } from "react";
import { OrderItemsContext } from "./OrderItemsContext";

export const useOrderItemsContext = () => {
  const orderItems = useContext(OrderItemsContext);
  if (orderItems === undefined) {
    throw new Error("Order Items Context must be wrapped in a provider.");
  }
  return orderItems;
};
