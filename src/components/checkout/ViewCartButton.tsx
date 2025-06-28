"use client";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export default function ViewCartButton() {
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
