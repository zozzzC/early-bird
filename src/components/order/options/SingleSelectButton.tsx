import { Button } from "@mantine/core";
import { useContext, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

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
  select(id: string, name: string, price: number): void;
  selectedItemId: string | null;
}) {

  //TODO: fix issue where the selected item ID suddenly turns to null for some reason ?

  return (
    <Button
      onClick={() => {
        select(id, name, price);
        
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
  );
}
