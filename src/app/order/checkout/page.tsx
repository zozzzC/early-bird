"use client";
import CheckoutList from "@/components/checkout/CheckoutList";
import OrderDetailsList from "@/components/checkout/OrderDetailsList";
import { useOrderItemsContext } from "@/hooks/useOrderItemsContext";

export default function Checkout() {
  const { orderItems } = useOrderItemsContext();

  return (
    <div className="pt-28 outline w-full flex xl:flex-row gap-5 md:justify-between items-center flex-col py-10">
      <div className="grow shrink">
        <CheckoutList orderItems={orderItems} />
      </div>
      <div className="outline py-10 shrink w-lg max-w-sm md:grow-0 md:max-w-lg">
        <OrderDetailsList />
      </div>
    </div>
  );
}
