import { ICartItem } from "@/types/Cart";
import { createHash } from "crypto";
import { cloneDeep } from "lodash";

export default function getCartItemId(cartItem: ICartItem) {
  const cartItemNoQuantity: ICartItem | any = cloneDeep(cartItem) as ICartItem;
  delete cartItemNoQuantity.quantity;
  delete cartItemNoQuantity.price;
  const hash = createHash("sha256");
  hash.update(JSON.stringify(cartItemNoQuantity));
  const val = hash.digest("hex");
  console.log(val);
  return val;
}
