import CartButton from "@/components/order/CartButton";
import OrderInstanceWrapper from "@/components/test/OrderInstanceWrapper";
import ViewCartJsx from "@/components/test/ViewCartJsx";
import CartProviderComponent from "@/components/wrappers/CartProviderComponent";

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
