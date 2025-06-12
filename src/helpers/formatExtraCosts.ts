import {
  ExtraCostsDetails,
  ExtraCostsResponse,
} from "@/types/ExtraCostsResponse";
import { rawNotionExtraCostProps } from "@/types/rawNotionDbRes";

export default async function formatExtraCosts(
  extraCosts: Array<{ key: string; value: rawNotionExtraCostProps }>
): Promise<ExtraCostsResponse> {
  //we want the response to be an object with key value pairs, since we will be using the name as the key
  const res: ExtraCostsResponse = {};

  extraCosts.forEach((i) => {
    const name = i.value.name.title[0].text.content;
    const price = i.value.price.number;

    if (name == null || price == null) {
      return;
    }

    const item: ExtraCostsDetails = {
      key: i.key,
      name: i.value.name.title[0].text.content as string,
      type: i.value.type.select.name as "milk" | "size" | "extra", //TODO: change this into a generic type as there is a chance that the selectable categories are not necessarily these.
      price: i.value.price.number as number,
    };

    res[name] = item;
  });

  return res;
}
