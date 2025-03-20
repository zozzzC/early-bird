import { Button } from "@mantine/core";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function SingleSelectButton({
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
  const [on, setOn] = useState<boolean>(false);

  return (
    <div>
      <Button
        onClick={() => {
          select(id), setOn(!on);
        }}
      >
        <div className="flex gap-3 items-center">
          {on ? <CheckCircle2 /> : null}
          {name}
        </div>
      </Button>
    </div>
  );
}
