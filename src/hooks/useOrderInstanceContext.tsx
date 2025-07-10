"use client";
import { useContext } from "react";
import { OrderInstanceContext } from "./OrderInstanceContext";

export const useOrderInstanceContext = () => {
  const orderInstanceContext = useContext(OrderInstanceContext);
  if (orderInstanceContext == undefined) {
    throw new Error("Order Instance Context must be wrapped in provider");
  }
  return orderInstanceContext;
};
