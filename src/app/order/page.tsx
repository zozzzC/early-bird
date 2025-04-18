import OrderItem from "@/components/order/OrderItem";
import data from "@/test/OrderSampleData.json";
import { Item } from "@/types/Item";
import { getOrderItems } from "../lib/orderItems";

export default async function Order() {
  const orderData: Item[] = data;
  const orderItems = await getOrderItems();

  return (
    <div className="w-full h-full">
      <div className="pt-28">
        <p>order</p>
        <div className="w-full h-full flex justify-center m-0">
          <div className="w-9/12 grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 m-0 gap-5">
            {orderItems.map((i) => {
              if (i.value.media.files.length != 0) {
                return (
                  <OrderItem
                    key={i.key}
                    id={i.key}
                    name={i.value.name.title[0].plain_text}
                    description={""}
                    photo={i.value.media.files[0].file.url}
                  />
                );
              }
              //use placeholder photo
              return (
                <OrderItem
                  key={i.key}
                  id={i.key}
                  name={i.value.name.title[0].plain_text}
                  description={""}
                  photo={orderData[0].photo}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
