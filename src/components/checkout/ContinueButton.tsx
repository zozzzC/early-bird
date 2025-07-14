"use client";
import { ICartItemWithId } from "@/types/Cart";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import InvalidOrderModal from "./InvalidOrderModal";

export default function ContinueButton({
  invalidOrder,
  itemsArray,
}: {
  invalidOrder: boolean;
  itemsArray: ICartItemWithId[];
}) {
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <Modal opened={opened} withCloseButton={false} onClose={close} size="xs">
        <InvalidOrderModal close={close} />
      </Modal>

      <div>
        <Button
          type="submit"
          onClick={() => {
            if (!invalidOrder && itemsArray.length != 0) {
              //TODO: then allow us to continue.
            }
          }}
        >
          continue
        </Button>
      </div>
    </>
  );
}
