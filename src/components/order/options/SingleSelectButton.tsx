import { Button } from "@mantine/core";
import { useContext, useState } from "react";

import { CheckCircle2, Circle } from "lucide-react";
import { TotalContext } from "@/app/hooks/TotalContext";

export default function SingleSelectButton({
  id,
  name,
  price,
  select,
  selectedItemId,
}: {
  id: string;
  name: string;
  price?: number;
  select(id: string): void;
  selectedItemId: string | null;
}) {
  const { total, setTotal } = useContext(TotalContext);
  return (
    <div>
      <Button
        onClick={() => {
          select(id);
        }}
      >
        <div className="flex gap-3 items-center">
          {selectedItemId === id ? <CheckCircle2 /> : <Circle />}
          <div className="flex flex-col">
            <p>{name}</p>
            {price ? <p>${price}</p> : null}
          </div>
        </div>
      </Button>
    </div>
  );
}
