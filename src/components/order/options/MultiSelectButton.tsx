import { Button } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { CheckCircle2, PlusCircle } from "lucide-react";
import { TotalContext } from "@/hooks/TotalContext";
import { useTotalContext } from "@/hooks/useTotalContext";

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
  const [on, setOn] = useState<boolean>(false);
  const { total, setTotal } = useTotalContext();

  useEffect(() => {
    setOn(selected);
  }, []);

  return (
    <Button
      onClick={() => {
        if (on) {
          select(id, name, price, on);
          setTotal(() => total - price);
        } else {
          select(id, name, price, on);
          setTotal(() => total + price);
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
