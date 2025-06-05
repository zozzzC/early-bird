import { ICart, ICartItem } from "@/types/Cart";
import { createHash } from "crypto";

class Cart {
  //A cart is shared throughout the app using context.
  items: ICart;

  constructor() {
    this.items = {};
  }

  //To prevent abuse, we require that the ID of each options is also passed in, EG: milk requires both the name AND the id.
  addCartItem(cartItem: ICartItem) {
    const hash = this.getCartItemId(cartItem);

    //check if hash exists already

    if (this.items[hash]) {
      this.items[hash].quantity++;
    } else {
      this.items[hash] = cartItem;
    }
  }

  //the specified orderItem's ID is used to delete
  removeCartItem(cartItem: ICartItem, quantity: number) {
    const hash = this.getCartItemId(cartItem);

    if (this.items[hash].quantity > 1) {
      this.items[hash].quantity--;
    } else {
      delete this.items[hash];
    }
  }

  getCartItemId(cartItem: ICartItem) {
    const cartItemNoQuantity: ICartItem | any = cartItem as ICartItem;
    delete cartItemNoQuantity.quantity;
    const hash = createHash("sha256");
    hash.update(JSON.stringify(cartItemNoQuantity));
    return hash.digest("hex");
  }

  getCartTotal() {}

  validateCart() {}
}
