import { useState } from "react";
import MultiSelectButton from "./MultiSelectButton";

type itemsId = {
  id: string;
};

export default function MultiSelectManager() {
  const [selectedItemsId, setSelectedItemsId] = useState<itemsId[]>([]);

  function select(id: string) {
    const items: itemsId[] = selectedItemsId;
    items.push({ id: id });
    setSelectedItemsId(items);
    console.log(JSON.stringify(selectedItemsId));
  }

  function removeSelect(id: string) {
    const items: itemsId[] = selectedItemsId;
    items.splice(items.indexOf({ id: id }));
    setSelectedItemsId(items);
    console.log(JSON.stringify(selectedItemsId));
  }

  return (
    <div>
      <MultiSelectButton
        id={"1"}
        name={"name"}
        price={2}
        select={select}
        removeSelect={removeSelect}
      />
      <MultiSelectButton
        id={"2"}
        name={"name 2"}
        price={2}
        select={select}
        removeSelect={removeSelect}
      />
    </div>
  );
}
