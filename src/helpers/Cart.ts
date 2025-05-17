import { ICart } from "@/types/Cart";

class Cart {
  //A cart is shared throughout the app using context.
  items: ICart;

  constructor() {
    this.items = {};
  }

  //To prevent abuse, we require that the ID of each options is also passed in, EG: milk requires both the name AND the id.
  addCartItem({
    itemId,
    name,
    category,
    milk,
    extra,
    quantity,
    price,
  }: {
    itemId: string;
    name: string;
    category: { id: string; name: string };
    milk: { id: string; name: string },
    extra: { id: string; name: string }[],
    quantity: number,
    price: number
  }) {

  }

  //the specified orderItem's ID is used to delete 
  removeCartItem({id} : {id: string}) {

  }

  getCartTotal() {}

  validateCart() {}
}
