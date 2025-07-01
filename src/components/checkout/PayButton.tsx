"use client";
import { Button } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import InvalidOrderModal from "./InvalidOrderModal";

export default function PayButton({ invalidOrder }: { invalidOrder: boolean }) {
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <Modal
        opened={opened}
        withCloseButton={false}
        onClose={close}
        size="xs"
      >
        <InvalidOrderModal close={close} />
      </Modal>

      <div>
        <Button
          onClick={() => {
            if (invalidOrder) {
              open();
            }
          }}
        >
          pay now
        </Button>
      </div>
    </>
  );
}
