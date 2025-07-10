"use client";
import { useCartContext } from "@/hooks/useCartContext";
import { ICart } from "@/types/Cart";
import { useEffect, useState } from "react";

export default function ViewCartJsx({
  showItems,
  showItemsArray,
}: {
  showItems?: boolean;
  showItemsArray?: boolean;
}) {
  const { items, itemsArray } = useCartContext();
  return (
    <>
      {showItems ? <p data-testid="items">{JSON.stringify(items)}</p> : null}
      <div className="py-10">
        {showItemsArray ? (
          <p data-testid="itemsArray">{JSON.stringify(itemsArray)}</p>
        ) : null}
      </div>
    </>
  );
}
