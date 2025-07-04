import { useContext, useEffect, useState } from "react";
import MultiSelectButton from "./MultiSelectButton";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";
import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";
import { ICartAddOn } from "@/types/Cart";
import { cloneDeep } from "lodash";

type itemsId = {
  id: string;
};

export default function MultiSelectManager({
  id,
  orderItemCategory,
  selectedItems,
}: {
  id: string;
  orderItemCategory: "extra";
  selectedItems?: ICartAddOn[] | null;
}) {
  const [selectedItemsId, setSelectedItemsId] = useState<ICartAddOn[]>(() => {
    if (selectedItems) {
      //NOTE: this is extremely important.
      //if we don't clone selectedItems, then the value that is mutated in the select() function is
      //the same array as the one being used by the orderHash. this casues a lot of problems.
      return cloneDeep(selectedItems);
    }

    return [];
  });
  const orderItem = useOrderItemContext();
  const orderInstance = useOrderInstanceContext();

  function select(id: string, name: string, price: number, on: boolean) {
    var value = selectedItemsId;

    if (on) {
      value.splice(
        value.findIndex((x) => x.id == id),
        1
      );
    } else {
      value.push({ id: id, name: name, price: price });
    }

    orderInstance.setOrderInstanceByField({
      field: "extra",
      value: cloneDeep(value.length === 0 ? null : value),
    });
    setSelectedItemsId(value);
  }

  function checkIfSelected(orderItemId: string): boolean {
    if (!selectedItems) {
      return false;
    }
    const index = selectedItems.find((x) => x.id === orderItemId);
    if (index) {
      return true;
    }
    return false;
  }

  return (
    <>
      {orderItem[orderItemCategory] ? (
        <>
          <p>{orderItemCategory}</p>
          <div className="grid xl:grid-cols-3 grid-cols-2 gap-5">
            {orderItem[orderItemCategory].map((i) => (
              <MultiSelectButton
                key={id + i.id}
                id={id + i.id}
                name={i.name}
                price={i.price}
                select={select}
                selected={checkIfSelected(id + i.id)}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
