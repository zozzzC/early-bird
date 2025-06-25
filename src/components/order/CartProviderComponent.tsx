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
  defaultItems,
  defaultItemsArray,
}: {
  children: React.ReactNode;
  defaultItems?: ICart;
  defaultItemsArray?: Array<ICartItemWithId>;
}) {
  const [items, setItems] = useState<ICart>(defaultItems ? defaultItems : {});
  const [itemsArray, setItemsArray] = useState<Array<ICartItemWithId>>(
    defaultItemsArray ? defaultItemsArray : []
  );

  //To prevent abuse, we require that the ID of each options is also passed in, EG: milk requires both the name AND the id.
  function addCartItem(
    cartItem: ICartItem,
    editedItemsArray?: ICartItemWithId[],
    editedItems?: ICart
  ) {
    const hash = getCartItemId(cartItem);
    const itemsArrayMutate = editedItemsArray
      ? editedItemsArray
      : [...itemsArray];
    const itemsMutate = editedItems ? editedItems : { ...items };

    if (itemsMutate[hash]) {
      const index = itemsArrayMutate.findIndex((x) => {
        return x.id === hash;
      });
      itemsMutate[hash].quantity += cartItem.quantity;
      getOrderInstanceTotal(itemsMutate[hash]);
      const editedItem = itemsMutate[hash];
      itemsArrayMutate[index] = { id: hash, ...editedItem };
    } else {
      getOrderInstanceTotal(cartItem);
      itemsMutate[hash] = cartItem;
      itemsArrayMutate.push({ id: hash, ...itemsMutate[hash] });
    }

    console.log("Item successfully added to cart: " + JSON.stringify(cartItem));

    //NOTE: we cannot just use setItems(items) because react sees this array as the same using shallow equality
    //hence we have to spread the object and array respectively in order for react to see that items and itemsArray are not the same as what they were before.
    setItems({ ...itemsMutate });
    setItemsArray([...itemsArrayMutate]);
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

  function editCartItem(cartItem: ICartItem, oldCartItem: ICartItem) {
    //check that the cartItems are not identical, if they are then the user didn't edit anything.

    if (JSON.stringify(cartItem) === JSON.stringify(oldCartItem)) {
      return;
    }

    const oldHash = getCartItemId(oldCartItem);
    const newHash = getCartItemId(cartItem);

    const itemsArrayMutate = [...itemsArray];
    const itemsMutate = { ...items };

    //check if the newHash already exists in items

    //check if the oldHash = newHash, in this case, the user just changed the quantity of the item, not the specs.
    //this means we have just have to change the quantity and price of the item.
    //so we delete the item in items and replace it
    //but only edit the item in itemsArray
    if (oldHash === newHash) {
      //check if the quantity is 0, if it is, then we just delete the item entirely.
      console.log("Quantity changed.");

      if (cartItem.quantity == 0) {
        removeCartItem(cartItem, oldCartItem.quantity);
      } else {
        delete itemsMutate[oldHash];

        getOrderInstanceTotal(cartItem);

        itemsMutate[newHash] = cartItem;

        const editItem = itemsArrayMutate.findIndex((x) => {
          return x.id === oldHash;
        });

        itemsArrayMutate[editItem] = { id: newHash, ...cartItem };
      }
    } else if (itemsMutate[newHash]) {
      //if this already exists in itemsMutate, we just need to change the quantity of that new item.
      if (cartItem.quantity != 0) {
        const exists = itemsMutate[newHash];

        cartItem.quantity += exists.quantity;

        getOrderInstanceTotal(cartItem);

        delete itemsMutate[oldHash];
        delete itemsMutate[newHash];

        const oldItem = itemsArrayMutate.findIndex((x) => {
          return x.id === oldHash;
        });

        itemsArrayMutate.splice(oldItem, 1);

        itemsMutate[newHash] = cartItem;

        const editItem = itemsArrayMutate.findIndex((x) => {
          return x.id === newHash;
        });

        itemsArrayMutate[editItem] = { id: newHash, ...cartItem };
      }
    } else {
      console.log("Edited item does not already exist. Attempting to add...");
      delete itemsMutate[oldHash];
      const deleteItem = itemsArrayMutate.findIndex((x) => {
        return x.id === oldHash;
      });
      itemsArrayMutate.splice(deleteItem, 1);
      addCartItem(cartItem, [...itemsArrayMutate], { ...itemsMutate });
      return;
    }
    setItems({ ...itemsMutate });
    setItemsArray([...itemsArrayMutate]);
  }

  function getCartItemId(cartItem: ICartItem) {
    const cartItemNoQuantity: ICartItem | any = JSON.parse(
      JSON.stringify(cartItem)
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

  return (
    <CartContext.Provider
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
    </CartContext.Provider>
  );
}
