import { Button } from "@mantine/core";
import { useState } from "react";
import { CheckCircle2, PlusCircle } from "lucide-react";

export default function MultiSelectButton({
  id,
  name,
  price,
  select,
  removeSelect,
}: {
  id: string;
  name: string;
  price: number;
  select(id: string): void;
  removeSelect(id: string): void;
}) {
  const [on, setOn] = useState<boolean>(false);

  return (
    <div>
      <Button
        onClick={() => {
          if (on) {
            removeSelect(id);
          } else {
            select(id);
          }
          setOn(!on);
        }}
      >
        <div className="flex gap-3 items-center">
          {on ? <CheckCircle2 /> : <PlusCircle />}
          {name}
        </div>
      </Button>
    </div>
  );
}
