import { ICart, ICartItemWithId } from "@/types/Cart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import getModal from "./gerModal";

export default function checkIfInvalid(
  itemsArray: ICartItemWithId[],
  orderItems: OrderModalResponse[]
): boolean {
  var invalid = false;
  itemsArray.forEach((i) => {
    if (getModal(i, orderItems) === undefined) {
      invalid = true;
      return;
    }
  });

  return invalid;
}
