"use client";
import { ICartItemWithId } from "@/types/Cart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import OrderItemModal from "../order/OrderItemModal";
import { OrderItemContext } from "@/hooks/OrderItemContext";
import { cloneDeep } from "lodash";
import formatPrice from "@/helpers/formatPrice";
import { useCartContext } from "@/hooks/useCartContext";
import CheckoutAddOn from "./CheckoutAddOn";

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

          <div
            key={cartItem.id}
            className="w-full flex flex-row items-center p-10 gap-10"
          >
            <div className="w-1/6 rounded-3xl">
              <div className="aspect-square relative">
                <Image
                  src={
                    orderModal.media
                      ? orderModal.media
                      : "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  }
                  alt={"image of " + orderModal.name}
                  fill
                  className={"object-cover"}
                />
              </div>
            </div>
            <div className="outline w-3/6">
              <p className="text-2xl">{cartItem.name}</p>
              {cartItem.size ? (
                <>
                  <p className="text-sm">{cartItem.size ? "size" : null}</p>
                  <CheckoutAddOn
                    name={cartItem.size.name}
                    price={cartItem.size.price}
                  />
                </>
              ) : null}
              {cartItem.milk ? (
                <>
                  <p className="text-sm">{cartItem.milk ? "milk" : null}</p>
                  <CheckoutAddOn
                    name={cartItem.milk.name}
                    price={cartItem.milk.price}
                  />
                </>
              ) : null}
              {cartItem.extra ? (
                <>
                  <p className="text-sm">{cartItem.extra ? "extra" : null}</p>
                  {cartItem.extra.map((i) => {
                    return <CheckoutAddOn name={i.name} price={i.price} />;
                  })}
                </>
              ) : null}
            </div>

            <div>
              <Button
                onClick={() => {
                  open();
                }}
              >
                edit item
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </OrderItemContext>
  );
}
