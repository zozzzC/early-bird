"use client";
import { CartContext } from "@/hooks/CartContext";
import { ICart, ICartAddOn, ICartItem, ICartItemWithId } from "@/types/Cart";
import { createHash } from "crypto";
import { cloneDeep } from "lodash";
import { useState } from "react";

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
    editedItems?: ICart,
    index?: number
  ) {
    const hash = getCartItemId(cartItem);
    const itemsArrayMutate = editedItemsArray
      ? editedItemsArray
      : [...itemsArray];
    const itemsMutate = editedItems ? editedItems : { ...items };
    sortArrayAddOns(cartItem);

    if (itemsMutate[hash]) {
      console.log(
        "Cart item already exists in cart. Adding cart item is updating teh quantity.,,"
      );
      const index = itemsArrayMutate.findIndex((x) => {
        return x.id === hash;
      });
      itemsMutate[hash].quantity += cartItem.quantity;
      getOrderInstanceTotal(itemsMutate[hash]);
      const editedItem = itemsMutate[hash];
      itemsArrayMutate[index] = { id: hash, ...editedItem };
    } else {
      console.log(
        "Cart item does not already exist in cart. Adding new cart item to cart..."
      );
      getOrderInstanceTotal(cartItem);
      itemsMutate[hash] = cartItem;
      console.log(index);
      if (index != undefined) {
        itemsArrayMutate[index] = { id: hash, ...cartItem };
        console.log(itemsArrayMutate[index]);
      } else {
        itemsArrayMutate.push({ id: hash, ...itemsMutate[hash] });
      }
    }

    console.log("Item successfully added to cart: " + JSON.stringify(cartItem));

    console.log(itemsArrayMutate);
    //NOTE: we cannot just use setItems(items) because react sees this array as the same using shallow equality
    //hence we have to spread the object and array respectively in order for react to see that items and itemsArray are not the same as what they were before.
    setItems({ ...itemsMutate });
    setItemsArray([...itemsArrayMutate]);
  }

  function isArrayAddOns(key: ICartAddOn[] | any) {
    if ((key as ICartAddOn[]) != null) {
      if ((key as ICartAddOn[]).length > 0) {
        if ((key as ICartAddOn[])[0].name) return true;
      }
      return false;
    }
    return false;
  }

  function compareAddOns(a: ICartAddOn, b: ICartAddOn) {
    return a.id.localeCompare(b.id);
  }

  function sortArrayAddOns(cartItem: ICartItem) {
    Object.values(cartItem).forEach((x) => {
      if (isArrayAddOns(x)) {
        (x as ICartAddOn[]).sort(compareAddOns);
      }
    });
  }

  //the specified orderItem's ID is used to delete
  function removeCartItem(cartItem: ICartItem) {
    const hash = getCartItemId(cartItem);
    const itemsMutate = cloneDeep(items);
    const itemsArrayMutate = cloneDeep(itemsArray);

    delete itemsMutate[hash];
    const deleteItem = itemsArrayMutate.findIndex((x) => {
      return x.id === hash;
    });
    itemsArrayMutate.splice(deleteItem, 1);

    setItems({ ...itemsMutate });
    setItemsArray([...itemsArrayMutate]);
  }

  function editCartItem(cartItem: ICartItem, oldCartItem: ICartItem) {
    //check that the cartItems are not identical, if they are then the user didn't edit anything.

    console.log(cartItem);
    console.log(oldCartItem);

    sortArrayAddOns(cartItem);

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
        removeCartItem(cartItem);
      } else {
        delete itemsMutate[oldHash];

        getOrderInstanceTotal(cartItem);

        itemsMutate[newHash] = cartItem;

        const editItem = itemsArrayMutate.findIndex((x) => {
          return x.id === oldHash;
        });

        itemsArrayMutate[editItem] = { id: newHash, ...cartItem };
      }
    } else if (newHash in itemsMutate) {
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
      const index = itemsArrayMutate.findIndex((x) => {
        return x.id === oldHash;
      });
      // itemsArrayMutate.splice(index, 1);
      //TODO: instead of addCartItem, change this to just replace the same index.
      console.log(itemsArrayMutate);
      console.log(index);
      addCartItem(cartItem, [...itemsArrayMutate], { ...itemsMutate }, index);
      console.log({ ...itemsMutate });
      console.log([...itemsArrayMutate]);
      return;
    }
    setItems({ ...itemsMutate });
    setItemsArray([...itemsArrayMutate]);

    console.log({ ...itemsMutate });
    console.log([...itemsArrayMutate]);
  }

  function getCartItemId(cartItem: ICartItem) {
    const cartItemNoQuantity: ICartItem | any = cloneDeep(
      cartItem
    ) as ICartItem;
    delete cartItemNoQuantity.quantity;
    delete cartItemNoQuantity.price;
    const hash = createHash("sha256");
    hash.update(JSON.stringify(cartItemNoQuantity));
    return hash.digest("hex");
  }

  function getCartTotal(): {
    total: number;
    totalWithoutAddOns: number;
    totalAddOns: number;
  } {
    //we can get the cart total by iterating through our items
    var totalWithoutAddOns = 0.0;
    var totalAddOns = 0.0;
    var total = 0.0;
    for (var key in items) {
      total += items[key].price;

      totalWithoutAddOns += items[key].basePrice * items[key].quantity;

      totalAddOns +=
        items[key].price - items[key].basePrice * items[key].quantity;
    }
    return { total, totalWithoutAddOns, totalAddOns };
  }

  function getOrderInstanceTotal(cartItem: ICartItem): number {
    var orderInstanceTotal = cartItem.basePrice;
    orderInstanceTotal += cartItem.milk ? cartItem.milk.price : 0;
    orderInstanceTotal += cartItem.size ? cartItem.size.price : 0;
    if (cartItem.extra?.length != 0) {
      cartItem.extra?.forEach((i) => {
        orderInstanceTotal += i.price;
      });
    }
    cartItem.price = orderInstanceTotal * cartItem.quantity;
    return cartItem.price;
  }

  function getOrderInstanceByHash(hash: string): ICartItem | undefined {
    if (hash in items) {
      return items[hash];
    }
    return undefined;
  }

  //TODO: this function will be used to revalidate the options and
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
        getOrderInstanceByHash,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
