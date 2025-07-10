"use client";
import "@mantine/core/styles.css"; //styles will not load properly if not imported
import { Item } from "@/types/Item";
import Image from "next/image";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import OrderItemModal from "./OrderItemModal";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";
import { OrderItemContext } from "@/hooks/OrderItemContext";
import { Suspense } from "react";

export default function OrderItem({
  id,
  name,
  description,
  photo,
  orderModal,
}: Item) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="h-full w-full pb-8">
      <OrderItemContext value={orderModal}>
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
          <OrderItemModal id={id} close={close} />
        </Modal>
        <div className="h-full flex flex-col relative items-center">
          <div className=" grow-1 max-w-80 w-3/4 overflow-hidden rounded-base">
            <div className="relative h-full aspect-square">
              {/* <div className="grow-1 object-cover w-full h-full max-w-80 relative aspect-square"> */}
              {/* TODO: add suspense while image is loading */}
              <Image
                onClick={open}
                src={photo.toString()}
                alt={"image of " + name}
                className={"object-cover"}
                fill
              />
            </div>
          </div>
          <p className="text-xl pt-3">{name}</p>
        </div>
      </OrderItemContext>
    </div>
  );
}
