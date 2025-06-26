import { useCartContext } from "@/hooks/useCartContext";
import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";
import { ICartItem } from "@/types/Cart";
import { Button } from "@mantine/core";

export default function EditButton({cartItem} : {cartItem: ICartItem}) {
  const { editCartItem } = useCartContext();
  const { orderInstance } = useOrderInstanceContext();

  return (
    <>
      <Button
        onClick={() => {
          if (orderInstance) {
            editCartItem(cartItem, orderInstance);
          }
        }}
      >
        edit cart item
      </Button>
    </>
  );
}
