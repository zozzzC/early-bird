import OrderItem from "@/components/order/OrderItem";
import data from "@/test/OrderSampleData.json";
import { Item } from "@/types/Item";

export default function Order() {
  const orderData: Item[] = data;

  return (
    <div>
      <p>order</p>
      <div className="flex md:flex-row flex-col gap-5 md:justify-center items-center flex-wrap">
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
  );
}
