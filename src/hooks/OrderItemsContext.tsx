"use client";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { createContext } from "react";

export const OrderItemsContext = createContext<
  { orderItems: OrderModalResponse[] } | undefined
>(undefined);
