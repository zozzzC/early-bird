import CheckoutList from "@/components/checkout/CheckoutList";
import { useCartContext } from "@/hooks/useCartContext";

export default function Checkout() {

    return (
        <div className="pt-28">
            <CheckoutList/>
        </div>
    )
}