"use client";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import InvalidOrderModal from "./InvalidOrderModal";

export default function ContinueButton() {
  const [opened, { close }] = useDisclosure();
  return (
    <>
      <Modal opened={opened} withCloseButton={false} onClose={close} size="xs">
        <InvalidOrderModal close={close} />
      </Modal>

      <div>
        <Button type="submit">continue</Button>
      </div>
    </>
  );
}
