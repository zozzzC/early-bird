import { ReactNode, useContext, useEffect, useState } from "react";
import SingleSelectButton from "./SingleSelectButton";
import { TotalContext } from "@/hooks/TotalContext";
import { useTotalContext } from "@/hooks/useTotalContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";
import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";
import { ICartAddOn } from "@/types/Cart";
import { getExtraCosts } from "@/lib/extraCosts";
import { ExtraCostsResponse } from "@/types/ExtraCostsResponse";

export default function SingleSelectManager({
  id,
  orderItemCategory,
  selectedItem,
}: {
  id: string;
  orderItemCategory: "milk" | "size";
  selectedItem?: ICartAddOn | null;
}) {
  const { total, setTotal } = useTotalContext();
  const orderInstance = useOrderInstanceContext();
  const orderItem = useOrderItemContext();

  //TODO: move state up to the order item modal.
  //TODO: do you still need this?
  const [selectedItemId, setSelectedItemId] = useState<string | null>(() => {
    if (selectedItem) return selectedItem.id;
    return null
  });

  const [selectedItemPrice, setSelectedItemPrice] = useState<number>(
    (): number => {
      if (orderItem.size) {
        return 0;
      }
      return 0;
    }
  );

  function select(id: string, name: string, price: number) {
    const field = orderItemCategory;

    const value: ICartAddOn = {
      id: id,
      name: name,
      price: price,
    };

    orderInstance.setOrderInstanceByField({ field, value });
    setSelectedItemId(id);
    setTotal(total + price - selectedItemPrice);
    setSelectedItemPrice(price);
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
