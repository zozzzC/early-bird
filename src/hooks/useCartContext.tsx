"use client";
import { CartContext } from "./CartContext";
import { useContext } from "react";

export const useCartContext = () => {
  const cartContext = useContext(CartContext);
  if (cartContext == undefined) {
    throw new Error("Cart Context must be wrapped in provider");
  }
  return cartContext;
};
