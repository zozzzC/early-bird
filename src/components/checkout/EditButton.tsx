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
  //TODO: the orderInstance and the oldOrderInstance are now identical so this causes errors when trying to update. 
  const { editCartItem, getOrderInstanceByHash, getCartItemId, items, itemsArray } = useCartContext();
  const { orderInstance } = useOrderInstanceContext();
  return (
    <div>
      <Button
        onClick={() => {

          //the orderHash and the orderInstance hash are both different 
          console.log(orderHash)
          console.log(getCartItemId(orderInstance as ICartItem));

          //it seems like when we change the items in the modal, this automatically updates the orderInstance
          //which appears to cause errors in items specifically, as now the wrong hash is being saved to that specific orderInstance
          //maybe items is being affected because the orderInstance is not a deep clone?  

          console.log(items)
          console.log(itemsArray)

          //but for some reason this says they are the same
          const oldOrderInstance = getOrderInstanceByHash(orderHash);
          console.log("old and new:");
          console.log(oldOrderInstance);
          console.log(orderInstance);

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
