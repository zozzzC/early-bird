"use server";
import {
  cartItemWithIdArraySchema,
  customerDetailsSchema,
} from "@/models/CustomerDetails";
import { OrderModel } from "@/models/OrderModel";
import type { ICartItemWithId } from "@/types/Cart";
import type { CustomerDetails } from "@/types/CustomerDetails";
import type { ICustomerDetailsAndItems } from "@/types/Preorders";

export async function createPreorderProcessing(
  customerDetails: CustomerDetails,
  itemsArray: ICartItemWithId[],
): Promise<any> {
  try {
    await customerDetailsSchema.validate(customerDetails);
    await cartItemWithIdArraySchema.validate(itemsArray);
  } catch (err) {
    console.warn("Error passing in props due to malformed input.");
    console.warn(err);
  }

  const body: Omit<ICustomerDetailsAndItems, "orderId"> = {
    ...customerDetails,
    itemsArray,
  };

  console.log(JSON.stringify(body));

  try {
    const order = await OrderModel.create({
      ...body,
    });
    return order._id;
  } catch (err) {
    console.log(err);
  }
}
