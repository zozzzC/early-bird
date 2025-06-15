"use server";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  rawNotionOrderPage,
  rawNotionOrderProps,
} from "../types/rawNotionDbRes";
import formatNotionRes from "../helpers/formatNotionRes";
import formatOrderModal from "../helpers/formatOrderModal";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { getExtraCosts } from "./extraCosts";
import { cache } from "react";

export async function fetchOrderItems(): Promise<Array<OrderModalResponse>> {
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

  const dbId = process.env.NOTION_ORDER_ITEMS_DB_ID;

  if (dbId) {
    const res: QueryDatabaseResponse = await notion.databases.query({
      database_id: dbId,
      sorts: [
        {
          property: "category",
          direction: "ascending",
        },
      ],
    });

    const data: rawNotionOrderPage<rawNotionOrderProps>[] =
      res.results as rawNotionOrderPage<rawNotionOrderProps>[];

    return await formatOrderModal(
      await formatNotionRes(data),
      await getExtraCosts()
    );
  }

  throw new Error("Notion DB ID and/or Notion Key not found.");
}

export const getOrderItems = cache(fetchOrderItems);
