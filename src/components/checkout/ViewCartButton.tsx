"use client";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { useCartContext } from "@/hooks/useCartContext";
import Link from "next/link";

export default function ViewCartButton() {
  const [showCartModal, setShowCartModal] = useState<boolean>(false);

  const cart = useCartContext();

  return (
    <>
      <div>
        <Link href={"/order/checkout"}>
          <ShoppingCartIcon size={35} />
        </Link>
      </div>
    </>
  );
}
