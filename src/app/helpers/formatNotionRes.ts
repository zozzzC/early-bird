import { rawNotionOrderPage } from "../about/types/rawNotionDbRes";

export default async function formatNotionRes<T>(
  data: rawNotionOrderPage<T>[]
) {
  let res: Array<T> = [];

  data.forEach((i) => res.push(i.properties));

  return res;
}
