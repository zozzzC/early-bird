import { ICart, ICartItem } from "@/types/Cart";
import { createHash } from "crypto";

export class Cart {
  //A cart is shared throughout the app using context.
  items: ICart;
  

  constructor() {
    this.items = {};
  }

  //To prevent abuse, we require that the ID of each options is also passed in, EG: milk requires both the name AND the id.
  addCartItem(cartItem: ICartItem) {
    const hash = this.getCartItemId(cartItem);
    //TODO: quantity is not found
    console.log("add cart item");
    //check if hash exists already

    if (this.items[hash]) {
      this.items[hash].quantity++;
    } else {
      this.getOrderInstanceTotal(cartItem);
      this.items[hash] = cartItem;
    }
    console.log(this.items);
  }

  //the specified orderItem's ID is used to delete
  removeCartItem(cartItem: ICartItem, quantity: number) {
    const hash = this.getCartItemId(cartItem);

    if (this.items[hash].quantity > 1) {
      this.items[hash].quantity = quantity;
    } else {
      delete this.items[hash];
    }
    console.log(JSON.stringify(this.items));
  }

  getCartItemId(cartItem: ICartItem) {
    const cartItemNoQuantity: ICartItem | any = structuredClone(
      cartItem
    ) as ICartItem;
    delete cartItemNoQuantity.quantity;
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

  validateCart() {}
}
