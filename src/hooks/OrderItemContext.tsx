"use client";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { createContext } from "react";

export const OrderItemContext = createContext<OrderModalResponse | undefined>(
  undefined
);
