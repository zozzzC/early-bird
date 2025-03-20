import { Button } from "@mantine/core";
import { useState } from "react";

export default function SingleSelect({
  id,
  name,
  price,
  select,
}: {
  id: string;
  name: string;
  price: number;
  select(id: string): void;
}) {
  const [on, setOn] = useState<boolean>();

  return (
    <div>
      <Button
        onClick={() => {
          select(id), setOn(!on);
        }}
      >
        {name}
      </Button>
    </div>
  );
}
