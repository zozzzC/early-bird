"use client";
import { ICart } from "@/types/Cart";
import { createContext } from "react";

//the general format for an item would be similar to the way the order items are formatted for the modals.
//cart items are stored in a dictionary
//key: JSON.stringify the object.
//value: info about the object, includes:
//name of item
//category of item
//extra add ons (either null or an array of objects. the array would include: name of add on, price of add on)
//milk
//size

//NOTE: if you order more than one item, the cart object will NOT contain the quantity, instead, determining if more than one item is in the cart and displaying this accordingly is a different task.

export const CartContext = createContext<ICart | undefined>(undefined);
