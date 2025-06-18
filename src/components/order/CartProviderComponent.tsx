"use client";
import { CartContext } from "@/hooks/CartContext";
import { Cart } from "@/helpers/Cart";
import { useState } from "react";
import { ICart, ICartItem, ICartItemWithId } from "@/types/Cart";
import { createHash } from "crypto";

//NOTE: This had to be made into a seperate use-client component because we cannot do this directly in the server component (see below error)
//Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported.
export default function CartProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<ICart>({});
  const [itemsArray, setItemsArray] = useState<ICartItemWithId[]>([]);

  //To prevent abuse, we require that the ID of each options is also passed in, EG: milk requires both the name AND the id.
  function addCartItem(cartItem: ICartItem) {
    const hash = getCartItemId(cartItem);

    if (items[hash]) {
      const index = itemsArray.findIndex((x) => {
        return x.id === hash;
      });
      items[hash].quantity += cartItem.quantity;
      getOrderInstanceTotal(items[hash]);
      const editedItem = items[hash];
      itemsArray[index] = { id: hash, ...editedItem };
    } else {
      getOrderInstanceTotal(cartItem);
      items[hash] = cartItem;
      itemsArray.push({ id: hash, ...items[hash] });
    }

    setItems(items);
    setItemsArray(itemsArray);
  }

  //the specified orderItem's ID is used to delete
  function removeCartItem(cartItem: ICartItem, quantity?: number) {
    const hash = getCartItemId(cartItem);

    if (quantity) {
      items[hash].quantity = quantity;
    } else {
      delete items[hash];
    }
    console.log(JSON.stringify(items));
  }

  function editCartItem(cartItem: ICartItem) {}

  function getCartItemId(cartItem: ICartItem) {
    const cartItemNoQuantity: ICartItem | any = structuredClone(
      cartItem
    ) as ICartItem;
    delete cartItemNoQuantity.quantity;
    delete cartItemNoQuantity.price;
    const hash = createHash("sha256");
    hash.update(JSON.stringify(cartItemNoQuantity));
    return hash.digest("hex");
  }

  function getCartTotal() {
    //we can get the cart total by iterating through our items
    var total = 0.0;
    for (var key in items) {
      total += items[key].price;
    }
    return total;
  }

  function getOrderInstanceTotal(cartItem: ICartItem) {
    var orderInstanceTotal = cartItem.price;
    orderInstanceTotal += cartItem.milk ? cartItem.milk.price : 0;
    orderInstanceTotal += cartItem.size ? cartItem.size.price : 0;
    if (cartItem.extra?.length != 0) {
      cartItem.extra?.forEach((i) => {
        orderInstanceTotal += i.price;
      });
    }
    cartItem.price = orderInstanceTotal * cartItem.quantity;
  }

  function validateCart() {}

  return (
    <CartContext
      value={{
        items,
        itemsArray,
        addCartItem,
        removeCartItem,
        editCartItem,
        getCartItemId,
        getOrderInstanceTotal,
      }}
    >
      {children}
    </CartContext>
  );
}
