import { rawNotionOrderPage } from "../types/rawNotionDbRes";

export default async function formatNotionRes<T>(
  data: rawNotionOrderPage<T>[]
): Promise<Array<{ key: string; value: T }>> {
  const res: Array<{ key: string; value: T }> = [];

  data.forEach((i) => {
    res.push({ key: i.id, value: i.properties });
  });

  return res;
}
