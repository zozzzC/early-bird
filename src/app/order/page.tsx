import OrderItem from "@/components/order/OrderItem";
import { useCartContext } from "@/hooks/useCartContext";
import { CartContext } from "@/hooks/CartContext";
import data from "@/test/OrderSampleData.json";
import { Item } from "@/types/Item";
import { getOrderItems } from "../../lib/orderItems";
import { revalidatePath } from "next/cache";

export default async function Order() {
  const orderItems = await getOrderItems();
  return (
    <div className="w-full h-full">
      <div className="pt-28">
        <p>order</p>
        <div className="flex justify-center m-0">
          <div className="w-9/12 grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 m-0 gap-5 h-full">
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
        <p>{JSON.stringify(orderItems)}</p>
      </div>
    </div>
  );
}
