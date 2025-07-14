export default function paymentProcessing() {

    //IDEA: 
    //put customer details and items inside of preorder processing db -- this means that we can get which customer did what payment
    //await stripe payment intent
    //if the payment intent fails, then we send error message back, and the corresponding db item is set to unpaid
    //if it goes through, then try to send mailgun email
    //if mailgun email goes through, then db item is set to paid, and formatting for preorders db is also set. 
    //if mailgun doesnt go through, then cancel payment / refund the payment.  
    //if db setting has error, cancel the payment / refund the payment 
}