import OrderItem from "@/components/order/OrderItem";

import data from "@/test/OrderSampleData.json";
import { Item } from "@/types/Item";
import { revalidatePath } from "next/cache";
import CartProviderComponent from "@/components/order/CartProviderComponent";
import { getExtraCosts } from "@/lib/extraCosts";
import CartButton from "@/components/order/cart/CartButton";
import { getOrderItems } from "@/lib/orderItems";
export default async function Order() {
  // const orderItems = await getOrderItems();
  const orderItems = await getOrderItems();

  return (
    <div className="w-full h-full">
      <div className="pt-28">
        <p>order</p>
        <div className="flex justify-center m-0">
          <div className="w-9/12 grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 m-0 gap-5 h-full">
            <div className="fixed bottom-6 right-5">
              <CartButton />
            </div>
            {orderItems.map((i) => {
              if (i.media != null) {
                return (
                  <OrderItem
                    key={i.key}
                    id={i.key}
                    name={i.name}
                    description={""}
                    photo={i.media}
                    orderItem={i}
                  />
                );
              }
              //use placeholder photo
              return (
                <OrderItem
                  key={i.key}
                  id={i.key}
                  name={i.name}
                  description={""}
                  photo={
                    "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  }
                  orderItem={i}
                />
              );
            })}
          </div>
        </div>
        {/* <p>{JSON.stringify(orderItems)}</p> */}
      </div>
    </div>
  );
}
