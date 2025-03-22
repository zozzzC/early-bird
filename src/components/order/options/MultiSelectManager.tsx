import { useContext, useState } from "react";
import MultiSelectButton from "./MultiSelectButton";
import { TotalContext } from "@/app/hooks/TotalContext";

type itemsId = {
  id: string;
};

export default function MultiSelectManager() {
  const [selectedItemsId, setSelectedItemsId] = useState<string[]>([]);

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
      <MultiSelectButton id={"1"} name={"name"} price={2} select={select} />
      <MultiSelectButton id={"2"} name={"name 2"} price={2} select={select} />
    </div>
  );
}
