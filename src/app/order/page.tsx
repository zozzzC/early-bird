import { getOrderItems } from "../lib/orderItems";

export default async function Order() {
  const orderItems = await getOrderItems();

  return (
    <div className="pt-20">
      <p>order</p>
      <p>{JSON.stringify(orderItems)}</p>
    </div>
  );
}
