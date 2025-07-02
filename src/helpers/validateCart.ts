import { ICart, ICartAddOn, ICartItem, ICartItemWithId } from "@/types/Cart";
import {
  itemStringWithId,
  OrderModalResponse,
} from "@/types/OrderModalResponse";
import { cloneDeep } from "lodash";
import getOrderInstanceTotal from "./getOrderInstanceTotal";

//NOTE: if we are using validateCart when attempting to load the cart from localStorage, we must also re-add everything into the cart.
//otherwise we are using this function to validate the cart before it is to be paid for.

export default function validateCart(
  items: ICart,
  itemsArray: ICartItemWithId[],
  orderItems: OrderModalResponse[],
  editCartItem: (cartItem: ICartItem, oldCartItem: ICartItem) => void
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

  //if the options changed (maybe one is out of stock, or no longer exists), then we dont change anything. it will be marked as out of stock later.

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
        console.log(`item param: ${item[k as keyof ICartItem]}`);

        //then we can indeed compare the two values with eachother.
        //there are a few different options here. depending on the type of val, then we need to do different price checks.
        //TODO: ensure that if it does contain a price (IE when val is a number), that
        if (containsPrice(item[k as keyof ICartItem]).containsPrice) {
          let val = containsPrice(item[k as keyof ICartItem]).typedVal;
          const valType = containsPrice(item[k as keyof ICartItem]).typeOfVal;

          console.log(valType);

          if (typeof val === "number") {
            //we don't want to cross-reference if the value is price, so skip it when it is equal to price.
            console.log("number");
            console.log(k);
            if (k === "basePrice") {
              const orderItemValue = (orderItem as OrderModalResponse)[
                k as keyof OrderModalResponse
              ] as number;
              if (orderItemValue != val) {
                console.log(val);
                console.log(orderItemValue);
                priceChanged = true;
                item[k] = orderItemValue;
              }
            }
          }

          if (valType === "ICartAddOn") {
            const optionArray = (orderItem as OrderModalResponse)[
              k as keyof OrderModalResponse
            ] as itemStringWithId[];

            const orderItemValue = optionArray.find((x) => {
              //NOTE: we use split here because the id in the order item (val) is key of the order item + key of the add on
              return x.id === (val as ICartAddOn).id.split(item.key)[1];
            });

            if (orderItemValue?.price != (val as ICartAddOn).price) {
              priceChanged = true;
              (val as ICartAddOn).price = (
                orderItemValue as itemStringWithId
              ).price;
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
                return n.id === x.id.split(item.key)[1];
              });

              console.log(correspondingOption);
              console.log(
                `corresponding option: ${correspondingOption?.price}`
              );

              if (x.price != correspondingOption?.price) {
                x.price = (correspondingOption as itemStringWithId).price;
                priceChanged = true;
                console.log("new val: ");
                console.log(val);
              }
            });
          }
        }
      }
    });

    console.log(`old price: ${item.price}`);
    getOrderInstanceTotal(item);
    console.log(item.price);
    console.log(item);
  });

  const newOrderItemsArray = reconstructItemsArray(
    itemsMutate,
    orderItems,
    false
  );

  //NOTE: in the case that editCart is defined, that means that we are using the validation function when attempting to pay now.
  //in that case, we want to edit the cart directly (to keep the order of the items in the cart.)
  if (editCartItem !== undefined) {
    Object.keys(itemsMutate).forEach((x) => {
      //match the id to the previous id.
      editCartItem(itemsMutate[x], items[x]);
    });
  }

  return {
    items: itemsMutate,
    itemsArray: newOrderItemsArray,
    priceChanged: priceChanged,
    optionsChanged: optionsChanged,
  };
}

function containsPrice(val: ICartItem[keyof ICartItem]): {
  containsPrice: boolean;
  typedVal: ICartItem[keyof ICartItem];
  typeOfVal: ICartItem[keyof ICartItem];
} {
  if (typeof val === "number") {
    return {
      containsPrice: true,
      typedVal: val as number,
      typeOfVal: "number",
    };
  }

  if (val == null) {
    return { containsPrice: false, typedVal: val as null, typeOfVal: "null" };
  }

  if ((val as ICartAddOn).price) {
    return {
      containsPrice: true,
      typedVal: val as ICartAddOn,
      typeOfVal: "ICartAddOn",
    };
  }

  if ((val as ICartAddOn[])[0].price) {
    return {
      containsPrice: true,
      typedVal: val as ICartAddOn[],
      typeOfVal: "ICartAddOn[]",
    };
  }

  if (typeof val === "string") {
    return {
      containsPrice: true,
      typedVal: val as string,
      typeOfVal: "string",
    };
  }

  return { containsPrice: false, typedVal: null, typeOfVal: "null" };
}

// function containsPrice<T extends keyof ICartItem>(
//   val: ICartItem[keyof ICartItem],
//   valType: T
// ): val is ICartItem[T] {
//   console.log(`val: ${val}`);

// //   return typeof val === ICartItem[valType];

//   if (typeof val === "number") {
//     return {
//       containsPrice: true,
//       typedVal: val as number,
//       typeOfVal: "number",
//     };
//   }

//   //TODO: everything that is not a number is returing as ICartAddOn are returning of type ICartAddOn. there is probably an issue with the type guard.
//   if ((val as ICartAddOn).price) {
//     console.log("val as ICartAddOn");
//     console.log(val as ICartAddOn);

//     return {
//       containsPrice: true,
//       typedVal: val as ICartAddOn,
//       typeOfVal: "ICartAddOn",
//     };
//   }

//   if ((val as ICartAddOn[])[0].price) {
//     return {
//       containsPrice: true,
//       typedVal: val as ICartAddOn[],
//       typeOfVal: "ICartAddOn[]",
//     };
//   }

//   return { containsPrice: false, typedVal: val as null, typeOfVal: "null" };
// }

function reconstructItemsArray<T extends boolean>(
  items: ICart,
  orderItems: OrderModalResponse[],
  validate: T
): T extends true ? null : ICartItemWithId[] {
  const newItemsArray: ICartItemWithId[] = [];
  Object.keys(items).forEach((i) => {
    newItemsArray.push({
      id: i,
      ...items[i],
    });
  });

  if (validate == true) {
    validateCart(items, newItemsArray, orderItems);
    return null as T extends true ? null : ICartItemWithId[];
  }

  return newItemsArray as T extends true ? null : ICartItemWithId[];
}
