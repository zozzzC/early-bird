"use server";
import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  rawNotionExtraCostProps,
  rawNotionOrderPage,
  rawNotionOrderProps,
} from "../types/rawNotionDbRes";
import formatNotionRes from "../helpers/formatNotionRes";
import formatOrderModal from "../helpers/formatOrderModal";
import formatExtraCosts from "@/helpers/formatExtraCosts";
import { ExtraCostsResponse } from "@/types/ExtraCostsResponse";

export async function getExtraCosts(): Promise<ExtraCostsResponse> {
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

  const dbId = process.env.NOTION_EXTRA_COSTS_DB_ID;

  if (dbId) {
    const res: QueryDatabaseResponse = await notion.databases.query({
      database_id: dbId,
      sorts: [
        {
          property: "type",
          direction: "ascending",
        },
      ],
    });

    const data: rawNotionOrderPage<rawNotionExtraCostProps>[] =
      res.results as rawNotionOrderPage<rawNotionExtraCostProps>[];

    return await formatExtraCosts(await formatNotionRes(data));
  }

  throw new Error("Notion DB ID and/or Notion Key not found.");
}
