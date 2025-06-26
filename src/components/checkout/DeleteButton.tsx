"use client";
import { X } from "lucide-react";
import { useCartContext } from "@/hooks/useCartContext";
import { ICartItem } from "@/types/Cart";

export default function DeleteButton({
  orderInstance,
}: {
  orderInstance: ICartItem;
}) {
  const { removeCartItem } = useCartContext();
  return (
    <div className="flex items-center">
      <button
        onClick={() => {
          removeCartItem(orderInstance);
        }}
      >
        <X size={20}></X>
      </button>
    </div>
  );
}
