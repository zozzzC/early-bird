"use client";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { rawNotionOrderProps } from "@/types/rawNotionDbRes";
import { createContext, useContext } from "react";

export const OrderItemContext = createContext<OrderModalResponse | undefined>(
  undefined
);
