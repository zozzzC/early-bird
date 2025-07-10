import { ICartAddOn, ICartItem } from "@/types/Cart";

function isArrayAddOns(key: ICartAddOn[] | any) {
  if ((key as ICartAddOn[]) != null) {
    if ((key as ICartAddOn[]).length > 0) {
      if ((key as ICartAddOn[])[0].name) return true;
    }
    return false;
  }
  return false;
}

function compareAddOns(a: ICartAddOn, b: ICartAddOn) {
  return a.id.localeCompare(b.id);
}

export function sortArrayAddOns(cartItem: ICartItem) {
  Object.values(cartItem).forEach((x) => {
    if (isArrayAddOns(x)) {
      (x as ICartAddOn[]).sort(compareAddOns);
    }
  });
}
