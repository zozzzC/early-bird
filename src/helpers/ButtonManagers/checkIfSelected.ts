import { ICartAddOn } from "@/types/Cart";

export default function checkIfSelected(
  addOn: ICartAddOn,
  selectedItems: ICartAddOn[] | null,
  editable: boolean
) {
  if (editable && selectedItems?.findIndex((x) => x.id === addOn.id) != -1) {
    return true;
  }

  return false;
}
