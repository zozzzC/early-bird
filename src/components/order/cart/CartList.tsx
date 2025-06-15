"use client";
import { OrderModalResponse } from "@/types/OrderModalResponse";
import { useCartContext } from "@/hooks/useCartContext";
import { useDisclosure } from "@mantine/hooks";
import { OrderItemContext } from "@/hooks/OrderItemContext";
import { Modal } from "@mantine/core";
import OrderItemModal from "../OrderItemModal";
import { createWriteStream } from "fs";

export default function CartList({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const cart = useCartContext();
  const [opened, { open, close }] = useDisclosure(false);
  console.log(JSON.stringify(cart.items));
  console.log(JSON.stringify(orderItems));

  return (
    <>
      {Object.keys(cart.items).map((i) => {
        const orderModalResponse = orderItems.find(
          (x) => (x.key as string) === (cart.items[i].key as string)
        );

        return (
          <div key={i}>
            {orderModalResponse ? (
              <OrderItemContext value={orderModalResponse}>
                <h1>{cart.items[i].name}</h1>

                {cart.items[i].milk ? (
                  <>
                    <h1>milk</h1>
                    <p>{cart.items[i].milk.name}</p>
                    <p>{cart.items[i].milk.price}</p>
                  </>
                ) : null}

                {cart.items[i].extra ? (
                  <>
                    <h1>extra</h1>
                    {cart.items[i].extra?.map((i) => {
                      return (
                        <div key={i.id}>
                          <p>{i.name}</p>
                          <p>{i.price}</p>
                        </div>
                      );
                    })}
                  </>
                ) : null}

                <p>{cart.items[i].quantity}</p>
                <p>{cart.items[i].price}</p>
                <button onClick={open}>edit</button>
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
                    id={i}
                    editable={true}
                    cartItem={cart.items[i]}
                  />
                </Modal>
              </OrderItemContext>
            ) : (
              JSON.stringify(cart.items[i].key)
            )}
          </div>
        );
      })}
    </>
  );
}
