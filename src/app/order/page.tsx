import OrderItem from "@/components/order/OrderItem";

import ViewCartButton from "@/components/checkout/ViewCartButton";
import { getOrderItems } from "../../lib/orderItems";
export default async function Order() {
  const orderItems = await getOrderItems();

  return (
    <div className="w-full h-full">
      <div className="fixed bottom-0 right-0 pb-10 pr-10">
        <ViewCartButton />
      </div>
      <div className="pt-28">
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
                    orderModal={i}
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
                  orderModal={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
