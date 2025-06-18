import { OrderItemContext } from "@/hooks/OrderItemContext";
import { Button, Modal } from "@mantine/core";
import OrderItemModal from "../OrderItemModal";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { useCartContext } from "@/hooks/useCartContext";
import { useDisclosure } from "@mantine/hooks";
import { Item } from "@/types/Item";
import { ICartItem } from "@/types/Cart";

export default function CartListItem({
  orderModalResponse,
  orderInstance,
  orderHash,
}: {
  orderModalResponse: OrderModalResponse;
  orderInstance: ICartItem;
  orderHash: string;
}) {
  const { getCartItemId } = useCartContext();
  const [opened, { open, close }] = useDisclosure(false);
  console.log("Cart list item order hash: ");
  console.log(orderHash);
  return (
    <OrderItemContext value={orderModalResponse}>
      <Modal
        className="absolute z-10"
        opened={opened}
        onClose={close}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        size="100%"
      >
        <OrderItemModal
          id={getCartItemId(orderInstance)}
          editable={true}
          cartItem={orderInstance}
          orderHash={orderHash}
          close={close}
        />
      </Modal>
      <div className="pr-10">
        <h1>{orderInstance.name}</h1>

        {orderInstance.milk ? (
          <>
            <h1>milk</h1>
            <p>{orderInstance.milk.name}</p>
            <p>{orderInstance.milk.price}</p>
          </>
        ) : null}

        {orderInstance.extra ? (
          <>
            <h1>extra</h1>
            {orderInstance.extra?.map((i) => {
              return (
                <div key={i.id}>
                  <p>{i.name}</p>
                  <p>{i.price}</p>
                </div>
              );
            })}
          </>
        ) : null}

        <p>{orderInstance.quantity}</p>
        <p>{orderInstance.price}</p>
        <Button
          onClick={() => {
            console.log(orderInstance.name);
            open();
          }}
        >
          edit
        </Button>
      </div>
    </OrderItemContext>
  );
}
