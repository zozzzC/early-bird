"use server";

import { ICartItemWithId } from "@/types/Cart";
import { CustomerDetails } from "@/types/CustomerDetails";
import { Client } from "@notionhq/client";

export async function createPreorderProcessing(
  itemsArray: ICartItemWithId[],
  customerDetails: CustomerDetails
) {
  interface itemsAndDetails {
    customerDetails: CustomerDetails;
    itemsArray: ICartItemWithId[];
  }

  const body: itemsAndDetails = {
    customerDetails: customerDetails,
    itemsArray: itemsArray,
  };

  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

  const dbId = process.env.NOTION_PREORDER_PROCESSING_DB_ID;

  if (dbId) {
    await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: dbId,
      },
      properties: {
        name: {
          title: [
            {
              text: {
                content: "order",
              },
            },
          ],
        },
        status: {
          select: {
            name: "processing",
          },
        },
      },
      children: [
        {
          object: "block",
          paragraph: {
            rich_text: [
              {
                text: {
                  content: JSON.stringify(body),
                },
              },
            ],
          },
        },
      ],
    });
  }
  throw new Error("Notion DB ID and/or Notion Key not found.");
}
