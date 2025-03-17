"use client";
import "@mantine/core/styles.css"; //styles will not load properly if not imported
import { Item } from "@/types/Item";
import Image from "next/image";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import OrderItemModal from "./OrderItemModal";

export default function OrderItem({ name, description, photo }: Item) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="h-full w-full">
      {opened ? (
        <Modal
          className="absolute top-0 z-10 h-full w-full"
          opened={opened}
          onClose={close}
          centered
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          size="100%"
        >
          <OrderItemModal />
        </Modal>
      ) : null}

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
