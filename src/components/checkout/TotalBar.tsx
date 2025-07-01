"use client";
import formatPrice from "@/helpers/formatPrice";
import { useCartContext } from "@/hooks/useCartContext";

export default function TotalBar() {
  const { getCartTotal } = useCartContext();

  const { total, totalWithoutAddOns, totalAddOns } = getCartTotal();
  return (
    <div>
      <div className="flex justify-between">
        <p>original price</p>
        <p>{formatPrice(totalWithoutAddOns)}</p>
      </div>
      <div className="flex justify-between">
        <p>add-ons</p>
        <p>{`+${formatPrice(totalAddOns)}`}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-xl">total</p>
        <p>{formatPrice(total)}</p>
      </div>
    </div>
  );
}
