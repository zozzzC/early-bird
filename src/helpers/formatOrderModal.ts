import { rawNotionOrderProps } from "@/types/rawNotionDbRes";
import {
  itemStringWithId,
  OrderModalResponse,
} from "@/types/OrderModalResponse";

export default async function formatOrderModal(
  data: Array<{ key: string; value: rawNotionOrderProps }>
): Promise<Array<OrderModalResponse>> {
  let res: Array<OrderModalResponse> = [];

  data.forEach((i) => {
    let media: string | null = null;

    if (i.value.media.files.length != 0) {
      media = i.value.media.files[0].file.url;
    }

    //TODO: fix allergy not showing

    let allergy = null;

    if (i.value.allergy.rich_text.length != 0) {
      allergy = i.value.allergy.rich_text[0].plain_text;
    }

    let extra: null | itemStringWithId[] = null;

    if (i.value.extra.multi_select.length != 0) {
      extra = [];
      i.value.extra.multi_select.forEach((i) => {
        extra.push({
          id: i.id,
          name: i.name,
        });
      });
    }

    let category: string = "other";

    if (i.value.category.select) {
      category = i.value.category.select.name;
    }

    let milk: null | itemStringWithId[] = null;

    if (i.value.milk.multi_select.length != 0) {
      milk = [];
      i.value.milk.multi_select.forEach((i) => {
        milk.push({
          id: i.id,
          name: i.name,
        });
      });
    }

    let size: null | itemStringWithId[] = null;

    if (i.value.size.multi_select.length != 0) {
      size = [];
      i.value.size.multi_select.forEach((i) => {
        size.push({
          id: i.id,
          name: i.name,
        });
      });
    }

    let outOfStock = i.value.out_of_stock.checkbox;
    let price = i.value.price.number;

    if (price == null) return;

    let name: null | string = null;

    if (i.value.name.title[0].plain_text == null) {
      return;
    } else {
      name = i.value.name.title[0].plain_text;
    }

    const item = {
      key: i.key,
      name: name,
      category: category,
      allergy: allergy,
      media: media,
      extra: extra,
      size: size,
      milk: milk,
      price: price,
      outOfStock: outOfStock,
    };

    res.push(item);
  });

  console.log(res);

  return res;
}
