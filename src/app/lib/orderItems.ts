import { loadEnvConfig } from "@next/env";
import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { rawNotionOrderPage } from "../about/types/rawNotionDbRes";

//TODO: please test if this works
export async function getOrderItems(): Promise<
  (
    | PageObjectResponse
    | PartialPageObjectResponse
    | PartialDatabaseObjectResponse
    | DatabaseObjectResponse
  )[]
> {
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
    //TODO: change the below type to the custom type defined in rawNotionDbRes

    const result: (
      | PageObjectResponse
      | PartialPageObjectResponse
      | PartialDatabaseObjectResponse
      | DatabaseObjectResponse
    )[] = res.results;
    return result;
  }

  throw new Error("Notion DB ID and/or Notion Key not found.");
}
