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
  selectedItems,
  editable,
}: {
  id: string;
  orderItemCategory: "milk" | "size";
  selectedItems: ICartAddOn | null;
  editable: boolean;
}) {
  const { total, setTotal } = useTotalContext();
  const orderInstance = useOrderInstanceContext();
  const orderItem = useOrderItemContext();

  //TODO: move state up to the order item modal.
  //TODO: do you still need this?
  const [selectedItemId, setSelectedItemId] = useState<string | null>(() => {
    if (selectedItems && editable) {
      console.log(
        "single select selectedItems editable" +
          JSON.stringify(selectedItems) +
          JSON.stringify(editable)
      );
      return selectedItems.id;
    }
    return null;
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

    //TODO: refactor setTotal (yes right now i still need it in order to display the correct price in the modal)
    //but there might be a better way of going about showing the price instead.  
    setSelectedItemId(id);
    orderInstance.setOrderInstanceByField({ field, value });
    setTotal(total + price - selectedItemPrice);
    setSelectedItemPrice(price);
    // console.log(price);
    // console.log(total);
  }

  return (
    <>
      {orderItem[orderItemCategory] ? (
        <>
          <p>{orderItemCategory}</p>
          <div className="grid xl:grid-cols-3 gap-5 grid-cols-2">
            {orderItem[orderItemCategory].map((i) => {
              return (
                <SingleSelectButton
                  key={i.id}
                  id={i.id}
                  name={i.name}
                  select={select}
                  price={i.price}
                  selectedItemId={selectedItemId}
                />
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
}
