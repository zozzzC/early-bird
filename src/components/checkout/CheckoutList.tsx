"use client";
import getModal from "@/helpers/getModal";
import { useCartContext } from "@/hooks/useCartContext";
import { useValidateCart } from "@/hooks/useValidateCart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { Alert } from "@mantine/core";
import "@mantine/core/styles.css";
import { InfoIcon } from "lucide-react";
import CheckoutListItems from "./CheckoutListItems";
import TotalBar from "./TotalBar";
export default function CheckoutList({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const { itemsArray } = useCartContext();

  const { optionsChanged, priceChanged } = useValidateCart(orderItems);

  return (
    <div className="p-5">
      <div className="flex items-center flex-col">
        {optionsChanged ? (
          <Alert icon={<InfoIcon />} color="red" className="px-10 w-full">
            some selected options are unavailable and were changed. please check
            your cart before continuing.
          </Alert>
        ) : null}
        {priceChanged ? (
          <Alert icon={<InfoIcon />} color="red" className="px-10 pt-5 w-full">
            some prices were updated. please check your cart before continuing.
          </Alert>
        ) : null}
      </div>

      {itemsArray.map((x) => {
        return (
          <CheckoutListItems
            key={x.id}
            cartItem={x}
            orderModal={getModal(x, orderItems)}
          />
        );
      })}
      <TotalBar />
      {/* <div className="py-5">
        <ContinueButton invalidOrder={invalid} itemsArray={itemsArray} />
      </div> */}
    </div>
  );
}
