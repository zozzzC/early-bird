import CheckoutList from "@/components/checkout/CheckoutList";
import TotalBar from "@/components/checkout/TotalBar";
import { getOrderItems } from "@/lib/orderItems";

export default async function Checkout() {
  const orderItems = await getOrderItems();

  return (
    <div className="pt-28 w-full">
      <CheckoutList orderItems={orderItems} />
      <div className="p-10">
        <TotalBar />
      </div>
    </div>
  );
}
