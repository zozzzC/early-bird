import { ICartItemWithId } from "./Cart";
import { CustomerDetails } from "./CustomerDetails";

export interface ICustomerDetailsAndItems {
  orderId: string;
  customerDetails: CustomerDetails;
  itemsArray: ICartItemWithId[];
}
