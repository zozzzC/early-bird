import OrderItem from "@/components/order/OrderItem";
import data from "@/test/OrderSampleData.json";
import { Item } from "@/types/Item";


export default function Order() {
  const orderData: Item[] = data;
  return (
    <div>
      <p>order</p>
      <div className="flex justify-center m-0">
        <div className="w-9/12 grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 m-0 gap-5">
          {orderData.map((i) => (
            <OrderItem
              key={i.key}
              name={i.name}
              description={i.description}
              photo={i.photo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
