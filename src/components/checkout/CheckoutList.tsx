"use client";
import checkIfInvalid from "@/helpers/checkIfInvalid";
import getModal from "@/helpers/getModal";
import { useCartContext } from "@/hooks/useCartContext";
import { useValidateCart } from "@/hooks/useValidateCart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import "@mantine/core/styles.css";
import CheckoutListItems from "./CheckoutListItems";
import PayButton from "./PayButton";
import TotalBar from "./TotalBar";
export default function CheckoutList({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const { items, itemsArray } = useCartContext();

  const invalid = checkIfInvalid(itemsArray, orderItems);

  //TODO: the below function does not update to the correct/expected value.
  useValidateCart(items, itemsArray, orderItems);

  return (
    <div className="p-5">
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
        <PayButton invalidOrder={invalid} />
      </div>
    </div>
  );
}
