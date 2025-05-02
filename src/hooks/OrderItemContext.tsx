"use client"
import { rawNotionOrderProps } from "@/app/about/types/rawNotionDbRes";
import { createContext, useContext } from "react"

export const OrderItemContext = createContext<rawNotionOrderProps | undefined>(undefined);