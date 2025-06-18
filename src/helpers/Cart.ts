import { ICart, ICartItem, ICartItemArray } from "@/types/Cart";
import { createHash } from "crypto";
import { useState } from "react";

export class Cart {
  //A cart is shared throughout the app using context.
  items: ICart;
  //The items array is specifically made just to display the items in a specific order.
  itemsArray: ICartItemArray[];

  constructor() {
    this.items = {};
    this.itemsArray = [];
  }

  //To prevent abuse, we require that the ID of each options is also passed in, EG: milk requires both the name AND the id.
  addCartItem(cartItem: ICartItem) {
    const hash = this.getCartItemId(cartItem);

    if (this.items[hash]) {
      const index = this.itemsArray.findIndex((x) => {
        return x.id === hash;
      });

      this.items[hash].quantity += cartItem.quantity;

      this.getOrderInstanceTotal(this.items[hash]);

      this.itemsArray[index] = { ...this.items[hash], id: hash };
    } else {
      this.getOrderInstanceTotal(cartItem);

      this.items[hash] = cartItem;

      this.itemsArray.push({ ...this.items[hash], id: hash });
    }
  }

  editCartItem(newCartItem: ICartItem, oldOrderHash: string) {
    // const newCartItemHash = this.getCartItemId(newCartItem);

    //whatever the case is, we must always delete the item aassociated with the oldOrderHash

    //in the case where the newCartItem's hash and the oldOrderHash are identical, that must mean that we edited the qty
    //TODO: needs testing
    if (this.getCartItemId(newCartItem) === oldOrderHash) {
      const index = this.itemsArray.findIndex((x) => {
        return x.id === oldOrderHash;
      });

      this.items[oldOrderHash].quantity = newCartItem.quantity;

      this.getOrderInstanceTotal(this.items[oldOrderHash]);

      this.itemsArray[index] = {
        ...this.items[oldOrderHash],
        id: oldOrderHash,
      };
    }

    //find that order in the array
    console.log(this.itemsArray);

    const indexOfOldOrder = this.itemsArray.findIndex((x) => {
      x.id === oldOrderHash;
    });

    console.log("old order hash : " + oldOrderHash);
    console.log(this.itemsArray[indexOfOldOrder]);
    console.log(this.items[oldOrderHash]);

    delete this.items[oldOrderHash];

    //TODO: this is deleting the wrong index
    this.itemsArray.splice(indexOfOldOrder, 1);

    this.addCartItem(newCartItem);

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

  removeCartItem(cartItem: ICartItem, quantity: number) {
    const hash = this.getCartItemId(cartItem);

    if (this.items[hash].quantity > 1) {
      this.items[hash].quantity = quantity;
      //since we reduced the quantity we want to re-calculate the total
      this.getOrderInstanceTotal(cartItem);
      const index = this.itemsArray.findIndex((i) => {
        i.id === hash;
      });
      this.itemsArray[index] = { id: hash, ...cartItem };
    } else {
      delete this.items[hash];
      const index = this.itemsArray.findIndex((i) => {
        i.id === hash;
      });
      this.itemsArray.splice(index, 1);
    }
    console.log(JSON.stringify(this.items));
  }

  getCartItemId(cartItem: ICartItem) {
    const cartItemNoQuantity: ICartItem | any = structuredClone(
      cartItem
    ) as ICartItem;
    delete cartItemNoQuantity.quantity;
    delete cartItemNoQuantity.price;
    const hash = createHash("sha256");
    hash.update(JSON.stringify(cartItemNoQuantity));
    return hash.digest("hex");
  }

  getCartTotal() {
    //we can get the cart total by iterating through our items
    var total = 0.0;
    for (var key in this.items) {
      total += this.items[key].price;
    }
    return total;
  }

  getOrderInstanceTotal(cartItem: ICartItem) {
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

  validateCart() {}
}
