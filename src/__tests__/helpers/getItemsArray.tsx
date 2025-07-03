import { ICart, ICartItemWithId } from "@/types/Cart";

export default function getItemsArray(items: ICart): ICartItemWithId[] {
  const itemsArray: ICartItemWithId[] = [];
  for (const index in items) {
    const itemWithId: ICartItemWithId = {
      id: index,
      ...items[index],
    };
    itemsArray.push(itemWithId);
  }
  return itemsArray;
}
