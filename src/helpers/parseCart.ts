import { ICart, ICartItem, ICartItemWithId } from "@/types/Cart";
import getCartItemId from "./getCartItemId";

export default function parseCart(cart: ICart): ICart
{
  let items: ICart = {};

  for (const cartItem in cart) {
    const id = getCartItemId(cart[cartItem]);
    items = { ...items, [id]: cart[cartItem] as ICartItem };
  }

  return items;
}
