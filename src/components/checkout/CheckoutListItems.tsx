"use client";
import formatPrice from "@/helpers/formatPrice";
import { OrderItemContext } from "@/hooks/OrderItemContext";
import { useCartContext } from "@/hooks/useCartContext";
import { ICartItem, ICartItemWithId } from "@/types/Cart";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { cloneDeep } from "lodash";
import { MessageCircleWarning } from "lucide-react";
import Image from "next/image";
import OrderItemModal from "../order/OrderItemModal";
import CheckoutAddOn from "./CheckoutAddOn";
import DeleteButton from "./DeleteButton";

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
    <OrderItemContext.Provider value={orderModal}>
      {orderModal?.outOfStock === false ? (
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
            />
          </Modal>

          <div
            key={cartItem.id}
            className="w-full flex flex-col rounded-base max-w-5xl sm:flex-row justify-between items-center p-10 gap-10"
          >
            <div className="flex flex-row gap-3.5 w-full max-w-md items-center">
              <div className="overflow-hidden rounded-base aspect-square sm:w-60 w-0 md:max-w-60 ">
                <div className="w-full h-full relative object-cover">
                  <Image
                    data-testid="checkout-list-items-modal-image"
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
              <div className="w-full outline">
                <p className="text-2xl font-semibold">{cartItem.name}</p>
                <p className="text-xl ">{`x${cartItem.quantity}`}</p>
                <p>{formatPrice(cartItem.quantity * cartItem.basePrice)}</p>
                {cartItem.size ? (
                  <>
                    <p className="text-sm font-semibold">
                      {cartItem.size ? "size" : null}
                    </p>
                    <CheckoutAddOn
                      name={cartItem.size.name}
                      price={cartItem.size.price}
                    />
                  </>
                ) : null}
                {cartItem.milk ? (
                  <>
                    <p className="text-sm font-semibold">
                      {cartItem.milk ? "milk" : null}
                    </p>
                    <CheckoutAddOn
                      name={cartItem.milk.name}
                      price={cartItem.milk.price}
                    />
                  </>
                ) : null}
                {cartItem.extra ? (
                  <>
                    <p className="text-sm font-semibold">
                      {cartItem.extra ? "extra" : null}
                    </p>
                    {cartItem.extra.map((i) => {
                      return (
                        <CheckoutAddOn
                          key={i.id}
                          name={i.name}
                          price={i.price}
                        />
                      );
                    })}
                  </>
                ) : null}
              </div>
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
            <div>
              <DeleteButton
                orderInstance={getOrderInstanceByHash(cartItem.id) as ICartItem}
              ></DeleteButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="flex px-10 pt-5 items-center gap-1 text-rose-700">
            <MessageCircleWarning size={20} />
            <p className="pr-5">this item is currently unavailable.</p>
          </div>
          <div
            key={cartItem.id}
            className="w-full flex flex-row items-center justify-between p-10 gap-10"
          >
            <div className="">
              <p className="text-2xl">{cartItem.name}</p>
              <p className="text-xl">{`x${cartItem.quantity}`}</p>
              <p>{formatPrice(cartItem.quantity * cartItem.basePrice)}</p>
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
                    return (
                      <CheckoutAddOn key={i.id} name={i.name} price={i.price} />
                    );
                  })}
                </>
              ) : null}{" "}
            </div>
            <div>
              <DeleteButton
                orderInstance={getOrderInstanceByHash(cartItem.id) as ICartItem}
              ></DeleteButton>
            </div>
          </div>
        </div>
      )}
    </OrderItemContext.Provider>
  );
}
