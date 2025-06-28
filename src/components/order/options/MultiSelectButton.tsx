import { Button } from "@mantine/core";
import {  useState } from "react";
import { CheckCircle2, PlusCircle } from "lucide-react";

export default function MultiSelectButton({
  id,
  name,
  price,
  select,
  selected,
}: {
  id: string;
  name: string;
  price: number;
  select(id: string, name: string, price: number, on: boolean): void;
  selected: boolean;
}) {
  const [on, setOn] = useState<boolean>(() => {
    return selected;
  });

  return (
    <Button
      onClick={() => {
        if (on) {
          select(id, name, price, on);
        } else {
          select(id, name, price, on);
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
  );
}
