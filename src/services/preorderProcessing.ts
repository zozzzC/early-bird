"use server";

import {
  cartItemWithIdArraySchema,
  customerDetailsSchema,
} from "@/models/CustomerDetails.model";
import { ICartItemWithId } from "@/types/Cart";
import { CustomerDetails } from "@/types/CustomerDetails";
import { ICustomerDetailsAndItems } from "@/types/Preorders";
import { Client } from "@notionhq/client";

export async function createPreorderProcessing(
  customerDetails: CustomerDetails,
  itemsArray: ICartItemWithId[]
): Promise<string> {
  try {
    await customerDetailsSchema.validate(customerDetails);
    await cartItemWithIdArraySchema.validate(itemsArray);
  } catch (err) {
    console.warn("Error passing in props due to malformed input.");
    console.warn(err);
  }

  const body: Omit<ICustomerDetailsAndItems, "orderId"> = {
    customerDetails,
    itemsArray,
  };

  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

  const dbId = process.env.NOTION_PREORDER_PROCESSING_DB_ID;

  if (dbId) {
    const id = await notion.pages.create({
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
    return id.id;
  }
  throw new Error("Notion DB ID and/or Notion Key not found.");
}

export async function setPreorderProcessing(
  id: string,
  status: "processing" | "unpaid" | "paid"
) {
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

  const dbId = process.env.NOTION_PREORDER_PROCESSING_DB_ID;
  console.log(id);

  if (dbId) {
    try {
      await notion.pages.update({
        page_id: id,
        properties: {
          status: {
            select: {
              name: status,
            },
          },
        },
      });
    } catch (err) {
      console.warn(err);
      throw new Error("Error trying to update Preorder Processing.");
    }
  } else {
    throw new Error("Notion DB ID was not found for Preorder processing.");
  }
}
