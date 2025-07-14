"use client"
import formatPrice from "@/helpers/format/formatPrice";
import { ICartItem, ICartItemWithId } from "@/types/Cart";
import { Alert } from "@mantine/core";
import { InfoIcon } from "lucide-react";
import CheckoutAddOn from "./CheckoutAddOn";
import DeleteButton from "./DeleteButton";
import { useCartContext } from "@/hooks/useCartContext";

export default function OutOfStockListItem({
  cartItem,
}: {
  cartItem: ICartItemWithId;
}) {
  const { getOrderInstanceByHash } = useCartContext();

  return (
    <div className="">
      <div className="px-10 pt-5 items-center">
        <Alert icon={<InfoIcon />} color="red" className="w-full">
          this item is currently unavailable. please remove it from your cart
          before continuing.
        </Alert>
      </div>
      <div
        key={cartItem.id}
        className="w-full flex flex-row items-center justify-between p-10 gap-10"
      >
        <div className="">
          <p className="text-2xl">{cartItem.name}</p>
          <p className="text-xl">{`x${cartItem.quantity}`}</p>
          <p>{formatPrice(cartItem.quantity * cartItem.basePrice)}</p>
          {cartItem.size ? (
            <>
              <p className="text-sm">{cartItem.size ? "size" : null}</p>
              <CheckoutAddOn
                name={cartItem.size.name}
                price={cartItem.size.price}
              />
            </>
          ) : null}
          {cartItem.milk ? (
            <>
              <p className="text-sm">{cartItem.milk ? "milk" : null}</p>
              <CheckoutAddOn
                name={cartItem.milk.name}
                price={cartItem.milk.price}
              />
            </>
          ) : null}
          {cartItem.extra ? (
            <>
              <p className="text-sm">{cartItem.extra ? "extra" : null}</p>
              {cartItem.extra.map((i) => {
                return (
                  <CheckoutAddOn key={i.id} name={i.name} price={i.price} />
                );
              })}
            </>
          ) : null}{" "}
        </div>
        <div>
          <DeleteButton
            orderInstance={getOrderInstanceByHash(cartItem.id) as ICartItem}
          ></DeleteButton>
        </div>
      </div>
    </div>
  );
}
