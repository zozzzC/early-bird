import { useContext, useState } from "react";
import MultiSelectButton from "./MultiSelectButton";
import { TotalContext } from "@/hooks/TotalContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";

type itemsId = {
  id: string;
};

export default function MultiSelectManager({ id }: { id: string }) {
  const [selectedItemsId, setSelectedItemsId] = useState<string[]>([]);
  const orderItem = useOrderItemContext();

  function select(id: string, on: boolean) {
    setSelectedItemsId((items) => {
      if (on) {
        items.splice(items.indexOf(id));
      } else {
        items.push(id);
      }
      return items;
    });
  }

  return (
    <div className="flex flex-row gap-5">
      {orderItem.extra.multi_select.map((i) => (
        <MultiSelectButton
          key={JSON.stringify(id + i.id)}
          id={JSON.stringify(id + i.id)}
          name={i.name}
          price={0.0}
          select={select}
        />
      ))}
    </div>
  );
}
