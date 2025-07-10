import { useContext } from "react";
import { OrderItemContext } from "./OrderItemContext";

export const useOrderItemContext = () => {
  const orderItemContext = useContext(OrderItemContext);

  if (orderItemContext == undefined) {
    throw new Error("Order Item Context must be wrapped in provider");
  }

  return orderItemContext;
};
