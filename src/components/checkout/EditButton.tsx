import { useCartContext } from "@/hooks/useCartContext";
import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";
import { ICartItem } from "@/types/Cart";
import { Button } from "@mantine/core";

export default function EditButton({
  orderHash,
  close,
}: {
  orderHash: string;
  close: () => void;
}) {
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
          close();
        }}
      >
        edit
      </Button>
    </div>
  );
}
