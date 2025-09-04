import { ICustomerDetailsAndItems } from "@/types/Preorders";
import { Button } from "@mantine/core";

interface OrderListProps {
  orders: ICustomerDetailsAndItems[];
}

export default function OrderList({ orders }: OrderListProps) {
  return orders.map((order) => {
    return (
      <div className="flex" key={order.orderId}>
        <div className="grid grid-cols-4">
          <p className="font-bold">{order.orderId}</p>
          <p>{order.customerDetails.name}</p>
          <p>{order.customerDetails.email}</p>
          <p>{order.customerDetails.pickupDate}</p>
        </div>
        <div>
          <Button>edit</Button>
        </div>
      </div>
    );
  });
}
