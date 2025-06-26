"use client";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { useCartContext } from "@/hooks/useCartContext";
import Link from "next/link";

export default function ViewCartButton() {

  return (
    <>
      <div className="bg-white-main rounded-full p-5">
        <Link href={"/order/checkout"}>
          <ShoppingCartIcon size={35} />
        </Link>
      </div>
    </>
  );
}
