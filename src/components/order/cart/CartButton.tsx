"use client";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import CartModal from "./CartModal";
import { useCartContext } from "@/hooks/useCartContext";
import Link from "next/link";

export default function CartButton() {
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const cart = useCartContext();

  return (
    <>
      <div>
        <Link href={"/order/checkout"}>
          <ShoppingCartIcon size={35} />
        </Link>
      </div>
      {showCartModal ? (
        <div className="bottom-0 right-0 absolute z-20">
          <CartModal
            showCartModal={showCartModal}
            setShowCartModal={setShowCartModal}
          />
        </div>
      ) : null}
    </>
  );
}
