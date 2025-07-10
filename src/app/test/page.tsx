import CartButton from "@/components/order/CartButton";
import CartProviderComponent from "@/components/order/CartProviderComponent";
import OrderInstanceWrapper from "@/components/test/OrderInstanceWrapper";
import ViewCartJsx from "@/components/test/ViewCartJsx";

export default function Test() {
  return (
    <OrderInstanceWrapper>
      <CartProviderComponent>
        <ViewCartJsx showItems={true} showItemsArray={true} />
        <CartButton />
      </CartProviderComponent>
    </OrderInstanceWrapper>
  );
}
