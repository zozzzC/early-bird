import { ICart } from "@/types/Cart";

class Cart {
  //A cart is shared throughout the app using context.
  items: ICart;

  constructor() {
    this.items = {};
  }

  addCartItem() {}

  removeCartItem() {}

  getCartTotal() {}
}
