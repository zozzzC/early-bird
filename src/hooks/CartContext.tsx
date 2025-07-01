"use client";
import { Cart } from "@/helpers/Cart";
import { ICart, ICartItem, ICartItemWithId } from "@/types/Cart";
import { createContext } from "react";

//NOTE: if you order more than one item, the cart object will NOT contain the quantity, instead, determining if more than one item is in the cart and displaying this accordingly is a different task.

export const CartContext = createContext<
  | {
      items: ICart;
      itemsArray: ICartItemWithId[];
      addCartItem: (cartItem: ICartItem) => void;
      removeCartItem: (cartItem: ICartItem) => void;
      editCartItem: (cartItem: ICartItem, oldCartItem: ICartItem) => void;
      getCartItemId: (cartItem: ICartItem) => void;
      getOrderInstanceTotal: (cartItem: ICartItem) => number;
      getOrderInstanceByHash: (hash: string) => ICartItem | undefined;
      getCartTotal: () => {
        total: number;
        totalWithoutAddOns: number;
        totalAddOns: number;
      };
    }
  | undefined
>(undefined);
