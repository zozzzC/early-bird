import { Button } from "@mantine/core";
import { useState } from "react";
import { CheckCircle2, PlusCircle } from "lucide-react";

export default function MultiSelectButton({
  id,
  name,
  price,
  select,
}: {
  id: string;
  name: string;
  price?: number;
  select(id: string, on: boolean): void;
}) {
  const [on, setOn] = useState<boolean>(false);

  return (
    <div>
      <Button
        onClick={() => {
          if (on) {
            select(id, on);
          } else {
            select(id, on);
          }
          setOn(!on);
        }}
      >
        <div className="flex gap-3 items-center">
          {on ? <CheckCircle2 /> : <PlusCircle />}
          <div className="flex flex-col">
            <p>{name}</p>
            {price ? <p>${price}</p> : null}
          </div>
        </div>
      </Button>
    </div>
  );
}
