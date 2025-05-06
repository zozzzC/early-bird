import { useContext, useState } from "react";
import SingleSelectButton from "./SingleSelectButton";
import { TotalContext } from "@/hooks/TotalContext";
import { useTotalContext } from "@/hooks/useTotalContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";

export default function SingleSelectManager({ id }: { id: string }) {
  const { total, setTotal } = useTotalContext();
  const orderItem = useOrderItemContext();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    JSON.stringify(id + orderItem.milk.multi_select[0].id)
  );
  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(0);

  function select(id: string, price: number) {
    setSelectedItemId(id);
    setTotal(total + price - selectedItemPrice);
    setSelectedItemPrice(price);
    console.log(price);
    console.log(total);
  }

  return (
    <div className="grid xl:grid-cols-3 gap-5 grid-cols-2">
      {orderItem.milk.multi_select.map((i) => (
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
  );
}
