import CheckoutList from "@/components/checkout/CheckoutList";
import { getOrderItems } from "@/lib/orderItems";

export default async function Checkout() {
  const orderItems = await getOrderItems();

  return (
    <div className="pt-28">
      <CheckoutList orderItems={orderItems} />
    </div>
  );
}
