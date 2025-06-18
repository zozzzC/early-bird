"use client";
import { CartContext } from "@/hooks/CartContext";
import { Cart } from "@/helpers/Cart";
import { useState } from "react";
import { ICart, ICartItem, ICartItemArray } from "@/types/Cart";
import { createHash } from "crypto";

//TODO: none of this works lol
export default function CartProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [itemsArray, setItemsArray] = useState<ICartItemArray[]>([]);
  const [items, setItems] = useState<ICart>({});

  function addCartItem(cartItem: ICartItem) {
    const hash = getCartItemId(cartItem);
    const itemsT = items;
    const itemsArrayT = itemsArray;

    if (itemsT[hash]) {
      const index = itemsArrayT.findIndex((x) => {
        return x.id === hash;
      });

      itemsT[hash].quantity += cartItem.quantity;

      getOrderInstanceTotal(itemsT[hash]);

      itemsArrayT[index] = { ...itemsT[hash], id: hash };
    } else {
      getOrderInstanceTotal(cartItem);

      itemsT[hash] = cartItem;

      itemsArrayT.push({ ...itemsT[hash], id: hash });

      setItems(itemsT);
      setItemsArray(itemsArrayT);
    }
  }

  function editCartItem(newCartItem: ICartItem, oldOrderHash: string) {
    const itemsT = items;
    const itemsArrayT = itemsArray;

    // const newCartItemHash = this.getCartItemId(newCartItem);

    //whatever the case is, we must always delete the item aassociated with the oldOrderHash

    //in the case where the newCartItem's hash and the oldOrderHash are identical, that must mean that we edited the qty
    //TODO: needs testing
    if (getCartItemId(newCartItem) === oldOrderHash) {
      const index = itemsArrayT.findIndex((x) => {
        return x.id === oldOrderHash;
      });

      itemsT[oldOrderHash].quantity = newCartItem.quantity;

      getOrderInstanceTotal(itemsT[oldOrderHash]);

      itemsArray[index] = {
        ...itemsT[oldOrderHash],
        id: oldOrderHash,
      };
    }

    //find that order in the array
    console.log(itemsArrayT);

    const indexOfOldOrder = itemsArrayT.findIndex((x) => {
      x.id === oldOrderHash;
    });

    console.log("old order hash : " + oldOrderHash);
    console.log(itemsArrayT[indexOfOldOrder]);
    console.log(itemsT[oldOrderHash]);

    delete itemsT[oldOrderHash];

    //TODO: this is deleting the wrong index
    itemsArrayT.splice(indexOfOldOrder, 1);

    setItems(itemsT);
    setItemsArray(itemsArrayT);

    addCartItem(newCartItem);

    // //if the newCartItemHash is already in items, then we adjust the quantity of items
    // if (this.items[newCartItemHash]) {
    //   //first, we get the item itself

    //   const editExistingItem = this.items[newCartItemHash];
    //   editExistingItem.quantity =
    //     editExistingItem.quantity + newCartItem.quantity;

    //   //now we must also search for that item in the array

    //   const indexOfEditExistingItem = this.itemsArray.findIndex((x) => {
    //     x.id === newCartItemHash;
    //   });

    //   //now that we have its index, we want to change the value of this index to our editExistingItem

    //   this.itemsArray[indexOfEditExistingItem] = {
    //     ...editExistingItem,
    //     id: newCartItemHash,
    //   };
    // } else {
    //   //if the newCartItemHash is not already in items, then we have to:

    // }
  }

  //TODO: redo this function
  function removeCartItem(cartItem: ICartItem, quantity?: number) {
    const hash = getCartItemId(cartItem);

    if (items[hash].quantity > 1) {
      items[hash].quantity = quantity;
      //since we reduced the quantity we want to re-calculate the total
      getOrderInstanceTotal(cartItem);
      const index = itemsArray.findIndex((i) => {
        i.id === hash;
      });
      itemsArray[index] = { id: hash, ...cartItem };
    } else {
      delete items[hash];
      const index = itemsArray.findIndex((i) => {
        i.id === hash;
      });
      itemsArray.splice(index, 1);
    }
    console.log(JSON.stringify(items));
  }

  function getCartItemId(cartItem: ICartItem): string {
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
    var orderInstanceTotal = cartItem.basePrice;
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

  //cart is used for when we want to call actions onto the cart
  return (
    <CartContext
      value={{
        items,
        itemsArray,
        addCartItem,
        editCartItem,
        removeCartItem,
        getOrderInstanceTotal,
        getCartTotal,
        getCartItemId,
      }}
    >
      {children}
    </CartContext>
  );
}
