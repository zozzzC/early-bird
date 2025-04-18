import { loadEnvConfig } from "@next/env";
import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  getPageProperty,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import {
  rawNotionOrderPage,
  rawNotionOrderProps,
} from "../about/types/rawNotionDbRes";
import formatNotionRes from "../helpers/formatNotionRes";

export async function getOrderItems(): Promise<rawNotionOrderProps[]> {
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

  const dbId = process.env.NOTION_DB_ID;

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

    return formatNotionRes(data);
  }

  throw new Error("Notion DB ID and/or Notion Key not found.");
}
