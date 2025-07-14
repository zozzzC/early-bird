import { ICartItemWithId } from "./Cart";
import { CustomerDetails } from "./CustomerDetails";

export interface ItemsAndDetails {
  customerDetails: CustomerDetails;
  itemsArray: ICartItemWithId[];
}
