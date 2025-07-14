import { ItemsAndDetails } from "@/types/Preorders";
import formatPrice from "./formatPrice";

export default function formatPreordersForDb(itemsAndDetails: ItemsAndDetails) {
  let bodyString = "";

  const customerName = itemsAndDetails["customerDetails"]["name"];
  const customerPhone = itemsAndDetails["customerDetails"]["phone"];
  const pickupDate = itemsAndDetails["customerDetails"]["pickupDate"];

  bodyString = `Name: ${customerName} \n Phone: ${customerPhone} \n Pickup Date: ${pickupDate}`;

  const itemsArray = itemsAndDetails["itemsArray"];

  for (const item of itemsArray) {
    let itemString = "";
    const itemName = item["name"];
    const itemBasePrice = item["basePrice"];

    itemString = `${itemName} \n Base Price: ${formatPrice(itemBasePrice)} \n`;

    const itemSize = item["size"] ? item["size"] : null;
    const itemMilk = item["milk"] ? item["milk"] : null;

    if (itemSize) {
      itemString += `${itemSize.name} \n   +${formatPrice(itemSize.price)}`;
    }

    itemString += `\n`;
    if (itemMilk) {
      itemString += `${itemMilk.name} \n   +${formatPrice(itemMilk.price)}`;
    }
    itemString += `\n`;

    let itemAddOns = null;

    if (item["extra"] != null) {
      itemAddOns = "";
      for (const addOn of item["extra"]) {
        itemAddOns += `${addOn.name} \n   +${formatPrice(addOn.price)} \n`;
      }
    }
    itemString += `\n`;

    itemString += `QTY: ${item["quantity"]} \n Total: ${item["price"]}`;
    bodyString += itemString;
  }

  return bodyString;
}
