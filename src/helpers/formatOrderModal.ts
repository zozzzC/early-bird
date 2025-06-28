import { ExtraCostsResponse } from "@/types/ExtraCostsResponse";
import {
  itemStringWithId,
  OrderModalResponse,
} from "@/types/OrderModalResponse";
import { rawNotionOrderProps } from "@/types/rawNotionDbRes";

export default async function formatOrderModal(
  order: Array<{ key: string; value: rawNotionOrderProps }>,
  extraCosts: ExtraCostsResponse
): Promise<Array<OrderModalResponse>> {
  const res: Array<OrderModalResponse> = [];

  order.forEach((i) => {
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
        if (extraCosts[i.name]) {
          (extra as itemStringWithId[]).push({
            id: i.id,
            name: i.name,
            price: extraCosts[i.name] ? extraCosts[i.name].price : 0,
          });
        } else {
          console.log(
            `Skipping ${i.name} because it does not have a price. Please specify the price.`
          );
        }
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
        if (extraCosts[i.name]) {
          (milk as itemStringWithId[]).push({
            id: i.id,
            name: i.name,
            price: extraCosts[i.name].price,
          });
        } else {
          console.log(
            `Skipping ${i.name} because it does not have a price. Please specify the price.`
          );
        }
      });
    }

    let size: null | itemStringWithId[] = null;

    if (i.value.size.multi_select.length != 0) {
      size = [];
      i.value.size.multi_select.forEach((i) => {
        if (extraCosts[i.name]) {
          (size as itemStringWithId[]).push({
            id: i.id,
            name: i.name,
            price: extraCosts[i.name].price,
          });
        } else {
          console.log(
            `Skipping ${i.name} because it does not have a price. Please specify the price.`
          );
        }
      });
    }

    const outOfStock = i.value.out_of_stock.checkbox;
    const price = i.value.price.number;

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
      basePrice: price,
      outOfStock: outOfStock,
    };

    res.push(item);
  });

  console.log(res);

  return res;
}
