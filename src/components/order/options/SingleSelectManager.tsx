import { ReactNode, useContext, useState } from "react";
import SingleSelectButton from "./SingleSelectButton";
import { TotalContext } from "@/hooks/TotalContext";
import { useTotalContext } from "@/hooks/useTotalContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";

export default function SingleSelectManager({ id }: { id: string }) {
  const { total, setTotal } = useTotalContext();
  const orderItem = useOrderItemContext();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    //TODO: while this does indeed work, the UI does not show that the item itself is selected yet.
    (): string | null => {
      if (orderItem.milk) {
        return orderItem.milk[0].id + id;
      }
      return null;
    }
  );
  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(
    (): number => {
      if (orderItem.milk) {
        return 0;
      }
      return 0;
    }
  );

  function select(id: string, price: number) {
    setSelectedItemId(id);
    setTotal(total + price - selectedItemPrice);
    setSelectedItemPrice(price);
    console.log(price);
    console.log(total);
  }

  //TODO: the passing on off the id and name does not seem to work.
  return (
    <div className="grid xl:grid-cols-3 gap-5 grid-cols-2">
      {orderItem.milk
        ? orderItem.milk.map((i) => (
            <SingleSelectButton
              key={JSON.stringify(id + i.id)}
              id={JSON.stringify(id + i.id)}
              name={i.name}
              select={select}
              price={0}
              selectedItemId={selectedItemId}
            />
          ))
        : null}
    </div>
  );
}
