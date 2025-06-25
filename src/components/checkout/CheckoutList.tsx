"use client";
import { useCartContext } from "@/hooks/useCartContext";
import Image from "next/image";

export default function CheckoutList() {
  const { itemsArray } = useCartContext();
  console.log(itemsArray);

  return (
    <div>
      {itemsArray.map((x) => {
        return (
          <div key={x.id}>
            <p className="text-2xl">{x.name}</p>
            {x.milk ? (
              <>
                <p className="text-xl">milk</p>
                <p>{x.milk.name}</p>
                <p>{x.milk.price}</p>
              </>
            ) : null}

            {x.extra ? (
              <>
                <p className="text-xl">extra</p>
                {x.extra.map((i) => {
                  return (
                    <>
                      <p>{i.name}</p>
                      <p>{i.price}</p>
                    </>
                  );
                })}
              </>
            ) : null}

            <p>quantity</p>
            <p>{x.quantity}</p>

            <p>total</p>
            <p>{x.price}</p>
          </div>
        );
      })}
    </div>
  );
}
