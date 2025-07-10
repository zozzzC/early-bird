import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";
import { ICartAddOn } from "@/types/Cart";
import { useState } from "react";
import SingleSelectButton from "./SingleSelectButton";

export default function SingleSelectManager({
  id,
  orderItemCategory,
  selectedItem,
}: {
  id: string;
  orderItemCategory: "milk" | "size";
  selectedItem?: ICartAddOn | null;
}) {
  const orderInstance = useOrderInstanceContext();
  const orderItem = useOrderItemContext();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(() => {
    if (selectedItem) return selectedItem.id;
    return null;
  });

  function select(id: string, name: string, price: number) {
    const field = orderItemCategory;

    const value: ICartAddOn = {
      id: id,
      name: name,
      price: price,
    };

    orderInstance.setOrderInstanceByField({ field, value });
    setSelectedItemId(id);
  }

  return (
    <>
      {orderItem[orderItemCategory] ? (
        <>
          <p>{orderItemCategory}</p>
          <div className="grid xl:grid-cols-3 gap-5 grid-cols-2">
            {orderItem[orderItemCategory].map((i) => (
              <SingleSelectButton
                key={id + i.id}
                id={id + i.id}
                name={i.name}
                select={select}
                price={i.price}
                selectedItemId={selectedItemId}
              />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
}
