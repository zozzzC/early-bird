import { createPreorderProcessing } from "@/services/preorderProcessing";
import { ICartItemWithId } from "@/types/Cart";
import { CustomerDetails } from "@/types/CustomerDetails";
import { ItemsAndDetails } from "@/types/Preorders";
import formatPreordersForDb from "./formatPreordersForDb";

export default async function paymentProcessing(
  customerDetails: CustomerDetails,
  itemsArray: ICartItemWithId[]
) {
  const details: ItemsAndDetails = {
    customerDetails: customerDetails,
    itemsArray: itemsArray,
  };

  const formattedPreordersForDbId = formatPreordersForDb(details);

  try {
    const preorderProcessingId = await createPreorderProcessing(
      customerDetails,
      itemsArray
    );
  } catch (err) {
    //if an error occurs, then we cannot continue.

  }


  //stripe stuff



  //if the payment goes through then we can attempt to first save into our preorder db -- if this fails, then we refund the payment
  
  try {
    
  } catch (err) {

  }


  //if we can successfuly save into the preorder db, then we can attempt to send an email -- if this fails, then we refund the payment, set to unpaid, and remove the order from the preorder db 


  //if this is successful, then send a 'success' console.log.


  //IDEA:
  //put customer details and items inside of preorder processing db -- this means that we can get which customer did what payment
  //await stripe payment intent
  //if the payment intent fails, then we send error message back, and the corresponding db item is set to unpaid
  //if it goes through, then try to send mailgun email
  //if mailgun email goes through, then db item is set to paid, and formatting for preorders db is also set.
  //if mailgun doesnt go through, then cancel payment / refund the payment.
  //if db setting has error, cancel the payment / refund the payment
}
