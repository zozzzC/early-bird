import { getOrderItems } from "@/lib/orderItems";

import CartList from "@/components/order/cart/CartList";

export default async function Checkout() {
  const orderItems = await getOrderItems();
  return (
    <div className="pt-28">
      <p>checkout</p>
      <CartList orderItems={orderItems} />
    </div>
  );
}
