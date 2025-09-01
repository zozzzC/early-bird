import type { ICartItemWithId } from "@/types/Cart";
import type { OrderModalResponse } from "@/types/OrderModalResponse";
import getModal from "./getModal";

export default function checkIfInvalid(
  itemsArray: ICartItemWithId[],
  orderItems: OrderModalResponse[]
): boolean {
  let invalid = false;
  itemsArray.forEach((i) => {
    if (getModal(i, orderItems) === undefined) {
      invalid = true; //check if any out of stock items are still in the items array. if there are, then we are not allowed to cont.
      return;
    }
  });

  return invalid;
}
