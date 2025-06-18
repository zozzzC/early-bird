"use client";
import { Cart } from "@/helpers/Cart";
import { ICart, ICartItem, ICartItemArray } from "@/types/Cart";
import { createContext, Dispatch, SetStateAction } from "react";

//NOTE: if you order more than one item, the cart object will NOT contain the quantity, instead, determining if more than one item is in the cart and displaying this accordingly is a different task.

export const CartContext = createContext<
  | {
      items: ICart;
      itemsArray: ICartItemArray[];
      addCartItem: (cartItem: ICartItem) => void;
      editCartItem: (newCartItem: ICartItem, oldOrderHash: string) => void;
      removeCartItem: (cartItem: ICartItem, quantity?: number) => void;
      getOrderInstanceTotal: (cartItem: ICartItem) => void;
      getCartTotal: () => void;
      getCartItemId: (cartItem: ICartItem) => string;
    }
  | undefined
>(undefined);
