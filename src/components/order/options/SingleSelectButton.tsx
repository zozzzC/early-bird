import { Button } from "@mantine/core";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function SingleSelectButton({
  id,
  name,
  price,
  select,
  selectedItemId,
}: {
  id: string;
  name: string;
  price: number;
  select(id: string): void;
  selectedItemId: string | null;
}) {
  return (
    <div>
      <Button
        onClick={() => {
          select(id);
        }}
      >
        <div className="flex gap-3 items-center">
          {selectedItemId === id ? <CheckCircle2 /> : null}
          <div className="flex flex-col">
            <p>{name}</p>
            <p>${price}</p>
          </div>
        </div>
      </Button>
    </div>
  );
}
