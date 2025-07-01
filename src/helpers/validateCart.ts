import { ICart, ICartAddOn, ICartItem, ICartItemWithId } from "@/types/Cart";
import {
  itemStringWithId,
  OrderModalResponse,
} from "@/types/OrderModalResponse";
import { cloneDeep } from "lodash";
import getOrderInstanceTotal from "./getOrderInstanceTotal";

//TODO: if we are using validateCart when attempting to load the cart from localStorage, we must also re-add everything into the cart.
//otherwise we are using this function to validate the cart before it is to be paid for.

export default function validateCart(
  items: ICart,
  itemsArray: ICartItemWithId[],
  orderItems: OrderModalResponse[]
): {
  items: ICart;
  itemsArray: ICartItemWithId[];
  priceChanged: boolean;
  optionsChanged: boolean;
} {
  const itemsArrayMutate = cloneDeep(itemsArray);
  const itemsMutate = cloneDeep(items);
  let priceChanged = false;
  let optionsChanged = false;

  //make sure that items and itemsArrayMutate, we can do this by REMOVING an item from the itemsArray everytime we find a corresponding item in itemsMutate have the same items.

  Object.keys(itemsMutate).forEach((i) => {
    const correspondingItem: number = itemsArrayMutate.findIndex((x) => {
      return x.id === i;
    });

    if (correspondingItem === -1) {
      //then the item was not found in the array, so we need to reconstruct the itemsArray using items.
      reconstructItemsArray(itemsMutate, orderItems, true);
    }

    const item = itemsMutate[i];

    //we can check the corresponding orderItems using the id. if we can't find it, then the item is out of stock/deleted.

    const orderItem = orderItems.find((x) => {
      return x.key === item.key;
    });
    if (!orderItem) return;

    Object.keys(item).forEach((k) => {
      //NOTE: k as keyof ICartItem means we are telling typescript that k is indeed a key of ICartItem. this means that
      //we ensure k is indeed one of key, milk, extra, basePrice -- bascially anything that is a key in ICartItem
      //this means val can be any of the possible types that are associated with any of the keys in ICartItem

      //first determine that k is indeed a key of OrderModalResponse

      if (orderItem[k as keyof OrderModalResponse]) {
        //then we can indeed compare the two values with eachother.
        //there are a few different options here. depending on the type of val, then we need to do different price checks.
        //TODO: ensure that if it does contain a price (IE when val is a number), that
        if (containsPrice(item[k as keyof ICartItem]).containsPrice) {
          let val = containsPrice(item[k as keyof ICartItem]).typedVal;
          const valType = containsPrice(item[k as keyof ICartItem]).typeOfVal;

          if (typeof val === "number") {
            //we don't want to cross-reference if the value is price, so skip it when it is equal to price.

            if (!(k == "price")) {
              const orderItemValue = (orderItem as OrderModalResponse)[
                k as keyof OrderModalResponse
              ] as number;
              if (orderItemValue != val) {
                priceChanged = true;
                val = orderItemValue;
              }
            }
          }

          if (valType === "ICartAddOn") {
            const optionArray = (orderItem as OrderModalResponse)[
              k as keyof OrderModalResponse
            ] as itemStringWithId[];
            //in this case we want to look for the corresponding id with whatever order item was selected. if we can't find it, then remove the option and set optionsChanged

            const orderItemValue = optionArray.find((x) => {
              return x.id === (val as ICartAddOn).id;
            });

            if (!orderItemValue) {
              //then remove the option.
              optionsChanged = true;
              val = null;
            }

            if (orderItemValue?.price != (val as ICartAddOn).price) {
              priceChanged = true;
              val = (orderItemValue as itemStringWithId).price;
            }
          }

          if (valType === "ICartAddOn[]") {
            const optionArray = (orderItem as OrderModalResponse)[
              k as keyof OrderModalResponse
            ] as itemStringWithId[];
            //in this case we want to look for the corresponding id with whatever order item was selected. if we can't find it, then remove the option and set optionsChanged

            const selectedOptionsArray = val as ICartAddOn[];

            //we loop through the entire array.

            selectedOptionsArray.forEach((x) => {
              //find the value corresponding to the same id in optionArray

              const correspondingOption = optionArray.find((n) => {
                return n.id === x.id;
              });

              if (!correspondingOption) {
                selectedOptionsArray.splice(
                  selectedOptionsArray.findIndex((y) => y.id === x.id),
                  1
                );
                optionsChanged = true;
              }

              if (x.price != correspondingOption?.price) {
                (correspondingOption as itemStringWithId).price = x.price;
                priceChanged = true;
              }
            });
          }
        }
      }
    });

    getOrderInstanceTotal(item);
  });

  const newOrderItemsArray = reconstructItemsArray(
    itemsMutate,
    orderItems,
    false
  );

  return {
    items: itemsMutate,
    itemsArray: newOrderItemsArray,
    priceChanged: priceChanged,
    optionsChanged: optionsChanged,
  };
}

function containsPrice<T extends ICartItem[keyof ICartItem]>(
  val: T
): {
  containsPrice: boolean;
  typedVal: ICartItem[keyof ICartItem];
  typeOfVal: string;
} {
  const t = typeof val;

  if (typeof val === "number") {
    return {
      containsPrice: true,
      typedVal: val as number,
      typeOfVal: "number",
    };
  }

  if (val as ICartAddOn) {
    return {
      containsPrice: true,
      typedVal: val as ICartAddOn,
      typeOfVal: "ICartAddOn",
    };
  }

  if (val as ICartAddOn[]) {
    return {
      containsPrice: true,
      typedVal: val as ICartAddOn[],
      typeOfVal: "ICartAddOn[]",
    };
  }

  if (typeof val === "string") {
    return {
      containsPrice: false,
      typedVal: val as string,
      typeOfVal: "string",
    };
  }

  return { containsPrice: false, typedVal: val as null, typeOfVal: "null" };
}

function reconstructItemsArray<
  T extends boolean,
  R = T extends true ? null : ICartItemWithId[],
>(items: ICart, orderItems: OrderModalResponse[], validate: T): R {
  const newItemsArray: ICartItemWithId[] = [];
  Object.keys(items).forEach((i) => {
    newItemsArray.push({
      id: i,
      ...items[i],
    });
  });

  if (validate == true) {
    validateCart(items, newItemsArray, orderItems);
    return null as R;
  }

  return newItemsArray as R;
}
