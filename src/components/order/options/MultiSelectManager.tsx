import { useContext, useEffect, useState } from "react";
import MultiSelectButton from "./MultiSelectButton";
import { TotalContext } from "@/hooks/TotalContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";
import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";
import { ICartAddOn } from "@/types/Cart";

type itemsId = {
  id: string;
};

export default function MultiSelectManager({
  id,
  orderItemCategory,
}: {
  id: string;
  orderItemCategory: "extra";
}) {
  const [selectedItemsId, setSelectedItemsId] = useState<ICartAddOn[]>([]);
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

    orderInstance.setOrderInstanceByField({ field: "extra", value: value });
    setSelectedItemsId(value);
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
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
