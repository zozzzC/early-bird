"use client";
import { Cart } from "@/helpers/Cart";
import { ICart } from "@/types/Cart";
import { createContext, Dispatch, SetStateAction } from "react";


//NOTE: if you order more than one item, the cart object will NOT contain the quantity, instead, determining if more than one item is in the cart and displaying this accordingly is a different task.

export const CartContext = createContext<{cart: Cart, c: Cart, setCart: Dispatch<SetStateAction<Cart>>} | undefined>(undefined);
