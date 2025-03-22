import { useState } from "react";
import SingleSelectButton from "./SingleSelectButton";

export default function SingleSelectManager() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  function select(id: string) {
    setSelectedItemId(id);
  }

  return (
    <div className="flex flex-row gap-5">
      <SingleSelectButton
        id={"1"}
        name={"name"}
        select={select}
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
