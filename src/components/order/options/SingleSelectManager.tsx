import { useContext, useState } from "react";
import SingleSelectButton from "./SingleSelectButton";
import { TotalContext } from "@/hooks/TotalContext";
import { useTotalContext } from "@/hooks/useTotalContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";

export default function SingleSelectManager() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(0);
  const { total, setTotal } = useTotalContext();
  const orderItem = useOrderItemContext();

  function select(id: string, price: number) {
    setSelectedItemId(id);
    setTotal(total + price - selectedItemPrice);
    setSelectedItemPrice(price);
    console.log(price);
    console.log(total);
  }

  return (
    <div className="flex flex-row gap-5">
      {orderItem.milk.multi_select.map((i) => (
        <SingleSelectButton
        id={i.id}
        name={i.name}
        select={select}
        price={0}
        selectedItemId={selectedItemId}/>
      ))}
    </div>
  );
}
