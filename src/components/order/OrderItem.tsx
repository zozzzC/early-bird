"use client";
import { Item } from "@/types/Item";
import Image from "next/image";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import OrderItemModal from "./OrderItemModal";

export default function OrderItem({ name, description, photo }: Item) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="h-full w-full">
      <Modal
        className="absolute w-full top-0 z-10"
        opened={opened}
        onClose={close}
        title={name}
      >
        <OrderItemModal />
      </Modal>
      <div className="h-full flex flex-col relative items-center">
        <div className="grow-1 object-cover w-full h-full max-w-80 relative aspect-square">
          <Image
            onClick={open}
            src={photo.toString()}
            alt={name}
            objectFit="cover"
            fill
          />
        </div>
        <p>{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
