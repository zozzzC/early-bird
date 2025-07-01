import formatPrice from "@/helpers/formatPrice";
import getDefaultSelection from "@/helpers/getDefaultSelection";
import { OrderInstanceContext } from "@/hooks/OrderInstanceContext";
import { useCartContext } from "@/hooks/useCartContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";
import { ICartAddOn, ICartItem, OrderInstanceType } from "@/types/Cart";
import { NumberInput } from "@mantine/core";
import cloneDeep from "lodash/cloneDeep";
import Image from "next/image";
import { useState } from "react";
import EditButton from "../checkout/EditButton";
import CartButton from "./CartButton";
import MultiSelectManager from "./options/MultiSelectManager";
import SingleSelectManager from "./options/SingleSelectManager";

//orderHash is provided if we are editing an existing item
export default function OrderItemModal({
  id,
  orderHash,
  orderInstanceClone,
  close,
}: {
  id: string;
  orderHash?: string;
  orderInstanceClone?: ICartItem;
  close: () => void;
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

  const [orderInstance, setOrderInstance] = useState<ICartItem>(() => {
    if (orderInstanceClone) {
      const extraClone: ICartAddOn[] | null = cloneDeep(
        orderInstanceClone.extra
      );

      if (extraClone) {
        orderInstanceClone["extra"] = extraClone;
      }

      return orderInstanceClone;
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
    const newOrderInstance: ICartItem = cloneDeep(orderInstance);
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
    <div className="w-full lg:grid lg:grid-cols-2 flex flex-col gap-5">
      <OrderInstanceContext.Provider
        value={{
          orderInstance,
          setOrderInstanceByField,
        }}
      >
        <div className="lg:max-h-full aspect-square rounded-base overflow-hidden">
          <div className="w-full lg:h-full lg:max-h-full aspect-square relative">
            {orderItem.media ? (
              <Image
                src={orderItem.media}
                fill
                alt="order image"
                className="object-cover"
              />
            ) : (
              <Image
                src={
                  "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                fill
                alt="order image"
                className="object-cover"
              />
            )}
          </div>
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
            <div className="w-full pt-5">
              <div className="gap-5 flex w-full items-center justify-end">
                <NumberInput
                  size="md"
                  className="w-20"
                  variant="filled"
                  defaultValue={orderHash ? orderInstance.quantity : 1}
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
                  allowDecimal={false}
                ></NumberInput>
              </div>
              <div className="flex justify-end pt-5">
                <p data-testid={`cart-item-price`} className="text-lg">
                  {formatPrice(total)}
                </p>
              </div>

              {orderHash ? (
                <EditButton orderHash={orderHash} close={close} />
              ) : (
                <CartButton close={close} />
              )}
            </div>
          </div>
        </div>
      </OrderInstanceContext.Provider>
    </div>
  );
}
