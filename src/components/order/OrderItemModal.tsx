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
import cloneDeep from "lodash/cloneDeep";

//orderHash is provided if we are editing an existing item
export default function OrderItemModal({
  id,
  orderHash,
  orderInstanceClone,
  close,
  isOpen,
}: {
  id: string;
  orderHash?: string;
  orderInstanceClone?: ICartItem;
  close: () => void;
  isOpen: boolean;
}) {
  const orderItem = useOrderItemContext();
  const { items, getOrderInstanceByHash, getOrderInstanceTotal } =
    useCartContext();
  const [total, setTotal] = useState<number>(
    orderHash
      ? getOrderInstanceByHash(orderHash)
        ? JSON.parse(
            JSON.stringify(getOrderInstanceByHash(orderHash) as ICartItem)
          ).price
        : orderItem.basePrice
      : orderItem.price
  );

  //TODO: items appears to be directly being edited as the object is being passed by reference.
  //this causes problems as orderInstance and getOrderInstanceByHash(orderHash) where the orderHash is the
  //old order hash is not working as we are directly editing the cartItem object that is in items
  //however, i am not sure how to fix this
  const [orderInstance, setOrderInstance] = useState<ICartItem>(() => {
    if (orderInstanceClone) {
      // console.log(`order hash received ${orderHash}`);
      // console.log("order item related to order hash:");
      // console.log(JSON.stringify(getOrderInstanceByHash(orderHash)));
      const extraClone: ICartAddOn[] | null = cloneDeep(
        orderInstanceClone.extra
      );

      if (extraClone) {
        orderInstanceClone["extra"] = extraClone;
      }

      return orderInstanceClone;
      // if (getOrderInstanceByHash(orderHash)) {
      //   const val = cloneDeep(getOrderInstanceByHash(orderHash)) as ICartItem;
      //   return val;
      // }
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

  console.log("Modal opened.");
  console.log("Order Instance:");
  console.log(JSON.stringify(orderInstance));
  console.log("Original Instance:");
  console.log(orderHash);
  console.log(JSON.stringify(getOrderInstanceByHash(orderHash as string)));

  //TODO CHORE: move this into helpers
  function setOrderInstanceByField<T extends "milk" | "size" | "extra">({
    field,
    value,
  }: {
    field: T;
    value: OrderInstanceType<T>;
  }): void {
    const newOrderInstance: ICartItem = cloneDeep(orderInstance);
    const extraClone: ICartAddOn[] | null = cloneDeep(orderInstance.extra);
    console.log(
      "Extra array same ref?",
      orderInstance?.extra === getOrderInstanceByHash(orderHash!)?.extra
    );
    //TODO: this says no, but it clearly is the same ref.

    //ICartItem[typeof field] is a lookup type. this checks the type of ICartItem at the type of field
    //EG: if field is 'milk' the ICartItem['milk'] = OrderInstanceType<"milk">
    //we have to ASSERT the type of value since OrderInstanceType<T> and ICartItem[T] are not necessarily the same value for every T.
    //hence we have to ensure that ICartItem is indeed that type
    newOrderInstance[field] = cloneDeep(value as ICartItem[typeof field]);
    console.log(newOrderInstance);
    getOrderInstanceTotal(newOrderInstance);
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
              <p>
                {JSON.stringify(getOrderInstanceByHash(orderHash as string))}
              </p>
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
                        quantity: e.valueOf() as number,
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
