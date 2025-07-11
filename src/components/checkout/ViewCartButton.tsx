"use client";
import { ShoppingCartIcon } from "lucide-react";
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
