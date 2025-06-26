"use client";
import { ICartItemWithId } from "@/types/Cart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import OrderItemModal from "../order/OrderItemModal";
import { OrderItemContext } from "@/hooks/OrderItemContext";
import { cloneDeep } from "lodash";
import { useCartContext } from "@/hooks/useCartContext";

export default function CheckoutListItems({
  cartItem,
  orderModal,
}: {
  cartItem: ICartItemWithId;
  orderModal: OrderModalResponse | undefined;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const { getOrderInstanceByHash } = useCartContext();

  return (
    <OrderItemContext value={orderModal}>
      {orderModal ? (
        <div>
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
              id={cartItem.key}
              orderHash={cartItem.id}
              orderInstanceClone={cloneDeep(
                getOrderInstanceByHash(cartItem.id)
              )}
              close={close}
              isOpen={opened}
            />
          </Modal>

          <div key={cartItem.id}>
            {/* <Image
              src={
                orderModal.media
                  ? orderModal.media
                  : "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              alt={"image of " + orderModal.name}
            /> */}
            <p className="text-2xl">{cartItem.name}</p>
            <Button
              onClick={() => {
                open();
              }}
            >
              edit item
            </Button>
          </div>
        </div>
      ) : null}
    </OrderItemContext>
  );
}
