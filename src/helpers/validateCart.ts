import { ICart, ICartAddOn, ICartItem, ICartItemWithId } from "@/types/Cart";
import {
  itemStringWithId,
  OrderModalResponse,
} from "@/types/OrderModalResponse";
import { cloneDeep } from "lodash";
import { sortArrayAddOns } from "./arrayAddOnSort";
import getOrderInstanceTotal from "./getOrderInstanceTotal";

//NOTE: if we are using validateCart when attempting to load the cart from localStorage, we must also re-add everything into the cart.
//otherwise we are using this function to validate the cart before it is to be paid for.

export default function validateCart(
  items: ICart,
  itemsArray: ICartItemWithId[],
  orderItems: OrderModalResponse[],
  editCartItem?: (cartItem: ICartItem, oldCartItem: ICartItem) => void
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

  for (const id in itemsMutate) {
    const correspondingArrayItem: number = itemsArrayMutate.findIndex((x) => {
      return x.id === id;
    });

    if (correspondingArrayItem === -1) {
      //then the item was not found in the array, we need to reconstruct the itemsArray using items.
      reconstructItemsArray(itemsMutate, orderItems, true);
    }

    const cartItem: ICartItem = itemsMutate[id];

    const orderItem = orderItems.find((oi) => oi.key === cartItem.key);

    if (!orderItem) continue;

    //this loops through all the properties in cartItem
    for (const cartProp of Object.keys(cartItem) as (keyof ICartItem)[]) {
      const orderItemProp = cartProp as keyof OrderModalResponse;

      if (!orderItem[orderItemProp]) {
        console.log(
          `Property ${cartProp} has no corresponding Order Item property.`
        );
      }

      if (orderItem[orderItemProp]) {
        const { typedVal, typeOfVal } = containsPrice(cartItem[cartProp]);
        console.log(
          `Property ${cartProp} has a corresponding Order Item property.\n Type of Val: ${typeOfVal}\n Val: ${JSON.stringify(typedVal)}`
        );

        const orderItemVal = orderItem[orderItemProp];

        switch (typeOfVal) {
          case "number":
            validateBasePrice(
              cartProp,
              cartItem,
              orderItemVal as number,
              priceChanged
            );
            break;
          case "ICartAddOn":
            validateICartAddOn(
              cartItem,
              cartProp,
              orderItemVal as itemStringWithId[],
              priceChanged,
              optionsChanged
            );
            break;
          case "ICartAddOn[]":
            validateICartAddOnArray(
              typedVal as ICartAddOn[],
              cartItem,
              cartProp,
              orderItemVal as itemStringWithId[],
              priceChanged,
              optionsChanged
            );
            break;
          case "null":
            validateNull(cartItem, cartProp, orderItem, orderItemProp);
            break;
          default:
            break;
        }
      }
    }

    getOrderInstanceTotal(cartItem);
  }

  const newOrderItemsArray = reconstructItemsArray(
    itemsMutate,
    orderItems,
    false
  );

  //TODO: this doesnt work properly.
  //NOTE: in the case that editCart is defined, that means that we are using the validation function when attempting to pay now.
  //in that case, we want to edit the cart directly (to keep the order of the items in the cart.)
  if (editCartItem !== undefined) {
    Object.keys(itemsMutate).forEach((x) => {
      //match the id to the previous id.

      editCartItem(itemsMutate[x], items[x]);
      console.log(itemsMutate);
      console.log(items);
    });
  }

  //TODO: if the items changed their hashes need to be recalculated

  return {
    items: itemsMutate,
    itemsArray: newOrderItemsArray,
    priceChanged: priceChanged,
    optionsChanged: optionsChanged,
  };
}

function validateNull(
  cartItem: ICartItem,
  cartProp: keyof ICartItem,
  orderItem: OrderModalResponse,
  orderItemProp: keyof OrderModalResponse
) {
  //TODO: change to use generic instead of hardcoding size and milk as single select.
  if ((orderItem[orderItemProp] as itemStringWithId[])[0]) {
    console.log(JSON.stringify(orderItem[orderItemProp] as itemStringWithId[]));
    if (cartProp == "milk" || cartProp == "size") {
      //this means that the field is null when it must have an option. so we get the default option (whatever is price of 0)
      cartItem[cartProp] = (
        orderItem[orderItemProp] as itemStringWithId[]
      ).find((x) => x.price == 0) as ICartAddOn;
    }
  }
}

function validateICartAddOnArray(
  selectedOptionsArray: ICartAddOn[],
  cartItem: ICartItem,
  cartProp: keyof ICartItem,
  optionArray: itemStringWithId[],
  priceChanged: boolean,
  optionsChanged: boolean
) {
  //we loop through the entire array.

  for (const selectedOption of selectedOptionsArray) {
    //NOTE: we have to do this split because the id in the selectedOption is not just the same as the id in the option array -- it also has cartItem's key added onto it.
    const orderOption = optionArray.find((x) => {
      return x.id === selectedOption.id.split(cartItem.key)[1];
    });

    if (orderOption) {
      if (orderOption.price != selectedOption?.price) {
        selectedOption.price = orderOption.price;
        priceChanged = true;
      }
    } else {
      //in this case we want to look for the corresponding id with whatever order item was selected. if we can't find it, then remove the option and set optionsChanged and priceChanged.
      optionsChanged = true;
      priceChanged = true;
      selectedOptionsArray.splice(
        selectedOptionsArray.indexOf(selectedOption, 1)
      );

      if (selectedOptionsArray.length == 0) {
        (cartItem[cartProp] as ICartAddOn[] | null) = null;
      }
    }
  }

  selectedOptionsArray.forEach((x) => {
    //find the value corresponding to the same id in optionArray

    const correspondingOption = optionArray.find((n) => {
      return n.id === x.id.split(cartItem.key)[1];
    });

    console.log(correspondingOption);
    console.log(`corresponding option: ${correspondingOption?.price}`);

    if (x.price != correspondingOption?.price) {
      x.price = (correspondingOption as itemStringWithId).price;
      priceChanged = true;
      console.log("new val: ");
      console.log(x.price);
    }
  });
}

function validateBasePrice(
  cartProp: keyof ICartItem,
  cartItem: ICartItem,
  orderItemVal: number,
  priceChanged: boolean
) {
  if (cartProp === "basePrice") {
    if (orderItemVal != cartItem[cartProp]) {
      priceChanged = true;
      cartItem[cartProp] = orderItemVal;
    }
  }
}

function validateICartAddOn(
  cartItem: ICartItem,
  cartProp: keyof ICartItem,
  optionArray: itemStringWithId[],
  priceChanged: boolean,
  optionsChanged: boolean
) {
  const orderItemValue = optionArray.find((x) => {
    //NOTE: we use split here because the id in the order item (val) is key of the order item + key of the add on
    return (
      x.id === (cartItem[cartProp] as ICartAddOn).id.split(cartItem.key)[1]
    );
  });

  console.log("validate ICartAddOn...");
  console.log(JSON.stringify(orderItemValue));

  if (orderItemValue != undefined) {
    if (orderItemValue?.price != (cartItem[cartProp] as ICartAddOn).price) {
      priceChanged = true;
      (cartItem[cartProp] as ICartAddOn).price = (
        orderItemValue as itemStringWithId
      ).price;
    }
  } else {
    //in this case the corresponding id was not found. that means replace this with the default order option.
    (cartItem[cartProp] as ICartAddOn | null) = optionArray.find(
      (x) => x.price === 0
    ) as ICartAddOn;
    optionsChanged = true;
  }
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

  if ((val as ICartAddOn[])[0]) {
    if ((val as ICartAddOn[])[0].price) {
      return {
        containsPrice: true,
        typedVal: val as ICartAddOn[],
        typeOfVal: "ICartAddOn[]",
      };
    }
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

function reconstructItemsArray<T extends boolean>(
  items: ICart,
  orderItems: OrderModalResponse[],
  validate: T
): T extends true ? null : ICartItemWithId[] {
  const newItemsArray: ICartItemWithId[] = [];
  Object.keys(items).forEach((i) => {
    sortArrayAddOns(items[i]);
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
