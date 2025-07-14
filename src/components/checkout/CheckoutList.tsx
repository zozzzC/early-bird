"use client";
import checkIfInvalid from "@/helpers/checkIfInvalid";
import getModal from "@/helpers/getModal";
import { useCartContext } from "@/hooks/useCartContext";
import { useValidateCart } from "@/hooks/useValidateCart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { Alert } from "@mantine/core";
import "@mantine/core/styles.css";
import { InfoIcon } from "lucide-react";
import CheckoutListItems from "./CheckoutListItems";
import ContinueButton from "./ContinueButton";
import TotalBar from "./TotalBar";
export default function CheckoutList({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const { items, itemsArray } = useCartContext();

  const invalid = checkIfInvalid(itemsArray, orderItems);

  const { optionsChanged, priceChanged } = useValidateCart(orderItems);

  return (
    <div className="p-5">
      {optionsChanged ? (
        <Alert icon={<InfoIcon />} color="red">
          some selected options are unavailable and were changed. please check
          your cart before continuing.
        </Alert>
      ) : null}
      <div className="pt-2">
        {priceChanged ? (
          <Alert icon={<InfoIcon />} color="red">
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
      <div className="py-5">
        <ContinueButton invalidOrder={invalid} itemsArray={itemsArray} />
      </div>
    </div>
  );
}
