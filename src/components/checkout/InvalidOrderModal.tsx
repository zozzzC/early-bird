import { Button } from "@mantine/core";

export default function InvalidOrderModal({close} : {close(): void}) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <p>
        you have unavailable items in your cart. please remove them from your
        cart to continue.
      </p>
      <Button onClick={close}>got it</Button>
    </div>
  );
}
