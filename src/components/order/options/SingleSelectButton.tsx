import formatPrice from "@/helpers/format/formatPrice";
import { Button } from "@mantine/core";
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
  // useEffect(() => {
  //   if (selectedItemId == null && price == 0) {
  //     console.log(
  //       ` no single select item selected. trying to use default ${name}.`
  //     );
  //     console.log(id);
  //     //TODO: for some reason, in size option although the id in here is correct, when its added to the cart it does not have the appended item id at the start of it
  //     select(id, name, price);
  //   }
  // }, []);

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
