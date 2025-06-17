import { ICartItem, OrderInstanceType } from "@/types/Cart";
import { useCartContext } from "@/hooks/useCartContext";
import { Button } from "@mantine/core";
import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";

export default function EditCartButton({
  oldOrderHash,
}: {
  oldOrderHash: string;
}) {
  const orderInstance = useOrderInstanceContext();
  const cart = useCartContext();

  //TODO: problem, it seems like orderInstance and oldOrderInstance are identical 

  return (
    <div>
      <Button
        onClick={() => {
          if (orderInstance.orderInstance != null) {
            cart.editCartItem(orderInstance.orderInstance, oldOrderHash);
            console.log((cart));
          }
        }}
      >
        Edit Item
      </Button>
    </div>
  );
}
