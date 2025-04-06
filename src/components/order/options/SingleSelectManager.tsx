import { useContext, useState } from "react";
import SingleSelectButton from "./SingleSelectButton";
import { TotalContext } from "@/hooks/TotalContext";
import { useTotalContext } from "@/hooks/useTotalContext";

export default function SingleSelectManager() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(0);
  const { total, setTotal } = useTotalContext();

  function select(id: string, price: number) {
    setSelectedItemId(id);
    setTotal(total + price - selectedItemPrice);
    setSelectedItemPrice(price);
    console.log(price);
    console.log(total);
  }

  return (
    <div className="flex flex-row gap-5">
      <SingleSelectButton
        id={"1"}
        name={"name"}
        select={select}
        price={5}
        selectedItemId={selectedItemId}
      />
      <SingleSelectButton
        id={"2"}
        name={"name"}
        price={5}
        select={select}
        selectedItemId={selectedItemId}
      />
    </div>
  );
}
