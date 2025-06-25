import { useCartContext } from "@/hooks/useCartContext";
import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";
import { ICartItem } from "@/types/Cart";
import { Button } from "@mantine/core";

export default function EditButton({ orderHash }: { orderHash: string }) {
  const { editCartItem, getOrderInstanceByHash } = useCartContext();
  const { orderInstance } = useOrderInstanceContext();
  return (
    <div>
      <Button
        onClick={() => {
          const oldOrderInstance = getOrderInstanceByHash(orderHash);
          editCartItem(
            orderInstance as ICartItem,
            oldOrderInstance as ICartItem
          );
        }}
      >
        edit
      </Button>
    </div>
  );
}
