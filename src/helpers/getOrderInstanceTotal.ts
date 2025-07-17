import { ICartItem } from "@/types/Cart";

export default function getOrderInstanceTotal(cartItem: ICartItem): number {
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
