import { ReactNode, useContext, useEffect, useState } from "react";
import SingleSelectButton from "./SingleSelectButton";
import { TotalContext } from "@/hooks/TotalContext";
import { useTotalContext } from "@/hooks/useTotalContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";

export default function SingleSelectManager({ id }: { id: string }) {
  const { total, setTotal } = useTotalContext();
  const orderItem = useOrderItemContext();
  //TODO: move state up to the order item modal.
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(
    (): number => {
      if (orderItem.size) {
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

  useEffect(() => {
    if (orderItem.size) {
      console.log(JSON.stringify(orderItem.size[0].id + id))
      select(JSON.stringify(orderItem.size[0].id + id), 0);
    }
    //TODO: while this does indeed work, the UI does not show that the item itself is selected yet.
  }, []);

  //TODO: the passing on off the id and name does not seem to work.
  return (
    <>
      {orderItem.size ? (
        <>
          <p>size</p>
          <div className="grid xl:grid-cols-3 gap-5 grid-cols-2">
            {orderItem.size.map((i) => (
              <SingleSelectButton
                key={JSON.stringify(id + i.id)}
                id={JSON.stringify(id + i.id)}
                name={i.name}
                select={select}
                price={0}
                selectedItemId={selectedItemId}
              />
            ))}
          </div>
          <p>{selectedItemId}</p>
        </>
      ) : null}
    </>
  );
}
