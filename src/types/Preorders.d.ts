import { ICartItemWithId } from "./Cart";
import { CustomerDetails } from "./CustomerDetails";

export interface ICustomerDetailsAndItems extends CustomerDetails {
  orderId: string;
  itemsArray: ICartItemWithId[];
}
