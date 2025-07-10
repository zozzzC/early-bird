import formatPrice from "@/helpers/formatPrice";
import { Button } from "@mantine/core";
import { CheckCircle2, Circle } from "lucide-react";
import { useEffect } from "react";

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
  useEffect(() => {
    if (selectedItemId == null && price == 0) {
      console.log(
        ` no single select item selected. trying to use default ${name}.`
      );
      select(id, name, price);
    }
  }, []);

  return (
    <Button
      onClick={() => {
        select(id, name, price);
      }}
      data-testid={`single-select-${id}`}
    >
      <div className="flex gap-3 items-center">
        {selectedItemId === id ? <CheckCircle2 /> : <Circle />}
        <div className="flex flex-col">
          <p>{name}</p>
          {price ? <p>{formatPrice(price)}</p> : null}
        </div>
      </div>
    </Button>
  );
}
