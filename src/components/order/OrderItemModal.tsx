import Image from "next/image";
import SingleSelectButton from "./options/SingleSelectButton";
import SingleSelectManager from "./options/SingleSelectManager";
import MultiSelectManager from "./options/MultiSelectManager";
import { Button, NumberInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { TotalContext } from "@/hooks/TotalContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";
import { OrderInstanceContext } from "@/hooks/OrderInstanceContext";
import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";
import CartButton from "./CartButton";
import { ICartAddOn, ICartItem, OrderInstanceType } from "@/types/Cart";
import { useCartContext } from "@/hooks/useCartContext";
import getDefaultSelection from "@/helpers/getDefaultSelection";
import EditButton from "../checkout/EditButton";

//orderHash is provided if we are editing an existing item
export default function OrderItemModal({
  id,
  orderHash,
  close,
}: {
  id: string;
  orderHash?: string;
  close: () => void;
}) {
  const orderItem = useOrderItemContext();
  const { getOrderInstanceByHash, getOrderInstanceTotal } = useCartContext();
  const [total, setTotal] = useState<number>(orderItem.price);

  const [orderInstance, setOrderInstance] = useState<ICartItem>(() => {
    if (orderHash) {
      if (getOrderInstanceByHash(orderHash)) {
        return getOrderInstanceByHash(orderHash) as ICartItem;
      }
    }

    return {
      key: orderItem.key,
      name: orderItem.name,
      category: orderItem.category,
      size: null,
      milk: null,
      extra: null,
      price: total,
      quantity: 1,
      basePrice: orderItem.basePrice,
    };
  });

  //TODO CHORE: move this into helpers
  function setOrderInstanceByField<T extends "milk" | "size" | "extra">({
    field,
    value,
  }: {
    field: T;
    value: OrderInstanceType<T>;
  }): void {
    const newOrderInstance = orderInstance;
    //ICartItem[typeof field] is a lookup type. this checks the type of ICartItem at the type of field
    //EG: if field is 'milk' the ICartItem['milk'] = OrderInstanceType<"milk">
    //we have to ASSERT the type of value since OrderInstanceType<T> and ICartItem[T] are not necessarily the same value for every T.
    //hence we have to ensure that ICartItem is indeed that type
    newOrderInstance[field] = value as ICartItem[typeof field];
    console.log(newOrderInstance);
    getOrderInstanceTotal(newOrderInstance) 
    setTotal(newOrderInstance.price);
    setOrderInstance(newOrderInstance);
  }

  return (
    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-5">
      <OrderInstanceContext
        value={{
          orderInstance,
          setOrderInstanceByField,
        }}
      >
          <div className="w-full lg:h-full lg:max-h-full aspect-square relative">
            {orderItem.media ? (
              <Image src={orderItem.media} fill alt="order image" />
            ) : (
              <Image
                src={
                  "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                fill
                alt="order image"
              />
            )}
          </div>
          <div className="flex-1 overflow-auto">
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col">
                <p className="text-3xl">{orderItem.name}</p>
                <SingleSelectManager
                  id={id}
                  orderItemCategory="size"
                  selectedItem={getDefaultSelection(orderHash)?.size}
                />
                <SingleSelectManager
                  id={id}
                  orderItemCategory="milk"
                  selectedItem={getDefaultSelection(orderHash)?.milk}
                />
                <MultiSelectManager
                  id={id}
                  orderItemCategory="extra"
                  selectedItems={getDefaultSelection(orderHash)?.extra}
                />
              </div>
              <div className="w-full pt-10">
                <div className="gap-5 pr-5 flex justify-end w-full items-center">
                  <NumberInput
                    size="md"
                    className="w-16"
                    variant="filled"
                    defaultValue={1}
                    min={1}
                    onChange={(e) => {
                      setOrderInstance({
                        ...orderInstance,
                        quantity: e.valueOf() as number,
                      } as ICartItem);

                      setTotal(
                        getOrderInstanceTotal({
                          ...orderInstance,
                          quantity: (e.valueOf() as number)
                        })
                      );
                    }}
                  ></NumberInput>
                </div>
                <div className="flex justify-end w-full p-5">
                  <div className="">
                    <p className="text-lg">{total}</p>
                  </div>
                </div>
                {orderHash ? (
                  <EditButton orderHash={orderHash} close={close} />
                ) : (
                  <CartButton close={close} />
                )}
              </div>
            </div>
          </div>
      </OrderInstanceContext>
    </div>
  );
}
