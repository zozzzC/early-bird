"use client";
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { useCartContext } from "@/hooks/useCartContext";
import Link from "next/link";

export default function ViewCartButton() {
  return (
    <>
      <Link href={"/order/checkout"}>
        <ShoppingCartIcon size={30} color="#443627" />
      </Link>
    </>
  );
}
