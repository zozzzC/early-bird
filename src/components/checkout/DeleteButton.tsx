"use client";
import { useCartContext } from "@/hooks/useCartContext";
import { ICartItem } from "@/types/Cart";
import { X } from "lucide-react";

export default function DeleteButton({
  orderInstance,
}: {
  orderInstance: ICartItem;
}) {
  const { removeCartItem } = useCartContext();
  return (
    <div className="flex items-center">
      <button
        data-testid="delete order item"
        onClick={() => {
          removeCartItem(orderInstance);
        }}
      >
        <X size={20}></X>
      </button>
    </div>
  );
}
