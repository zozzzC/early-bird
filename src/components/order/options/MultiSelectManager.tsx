import { useContext, useState } from "react";
import MultiSelectButton from "./MultiSelectButton";
import { TotalContext } from "@/hooks/TotalContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";

type itemsId = {
  id: string;
};

export default function MultiSelectManager({
  id,
  orderItemCategory,
}: {
  id: string;
  orderItemCategory: "extra" | "size" | "milk";
}) {
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
    <>
      {orderItem[orderItemCategory] ? (
        <>
          <p>{orderItemCategory}</p>
          <div className="grid xl:grid-cols-3 grid-cols-2 gap-5">
            {orderItem[orderItemCategory].map((i) => (
              <MultiSelectButton
                key={JSON.stringify(id + i.id)}
                id={JSON.stringify(id + i.id)}
                name={i.name}
                price={1.0}
                select={select}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
