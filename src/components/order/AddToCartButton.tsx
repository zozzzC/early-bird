import { useCartContext } from "@/hooks/useCartContext";
import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";
import { Button } from "@mantine/core";

export default function AddToCartButton() {
  const orderInstance = useOrderInstanceContext();
  const { cart, setCart } = useCartContext();

  return (
    <>
      <Button
        onClick={() => {
          if (orderInstance.orderInstance != null) {
            console.log(orderInstance.orderInstance);
            cart.addCartItem(orderInstance.orderInstance);
            setCart(cart)
          }
        }}
      >
        add to cart
      </Button>
    </>
  );
}
