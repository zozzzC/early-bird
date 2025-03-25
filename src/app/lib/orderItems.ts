import { loadEnvConfig } from "@next/env";
import { Client } from "@notionhq/client";

export async function getOrderItems() {
  "use server";
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

  const dbId = process.env.NOTION_DB_ID;

  if (dbId) {
    const res = await notion.databases.query({ database_id: dbId });
    return res;
  }
  throw new Error("Notion DB ID not found.");
}
