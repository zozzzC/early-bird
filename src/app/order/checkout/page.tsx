"use client";
import { useCartContext } from "@/hooks/useCartContext";

export default function Checkout() {
  const cart = useCartContext();
  console.log(cart.items);
  return (
    <div className="pt-28">
      <p>checkout</p>
      {Object.keys(cart.items).map((i) => {
        return (
          <div key={i}>
            <h1>{cart.items[i].name}</h1>

            {cart.items[i].milk ? (
              <>
                <h1>milk</h1>
                <p>{cart.items[i].milk.name}</p>
                <p>{cart.items[i].milk.price}</p>
              </>
            ) : null}

            {cart.items[i].extra ? (
              <>
                <h1>extra</h1>
                {cart.items[i].extra?.map((i) => {
                  return (
                    <>
                      <p>{i.name}</p>
                      <p>{i.price}</p>
                    </>
                  );
                })}
              </>
            ) : null}

            <p>{cart.items[i].quantity}</p>
            <p>{cart.items[i].price}</p>
          </div>
        );
      })}
    </div>
  );
}
