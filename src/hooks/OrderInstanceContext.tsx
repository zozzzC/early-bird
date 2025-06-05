import { ICartAddOn, ICartItem } from "@/types/Cart";
import { createContext, SetStateAction } from "react";

export const OrderInstanceContext = createContext<
  | {
      orderInstance: ICartItem | null;
      setOrderInstanceByField: ({
        field,
        value,
      }: {
        field: "size" | "milk" | "extra";
        value: null | ICartAddOn | ICartAddOn[];
      }) => void | null;
    }
  | undefined
>(undefined);
