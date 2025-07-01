import { ICartItemWithId } from "@/types/Cart";
import { OrderModalResponse } from "@/types/OrderModalResponse";

 export default function getModal(
    orderItem: ICartItemWithId,
    orderItems: OrderModalResponse[]
  ): OrderModalResponse | undefined {
    console.log(
      orderItems.find((x) => {
        return x.key === orderItem.key;
      })
    );
    return orderItems.find((x) => {
      return x.key === orderItem.key;
    });
  }