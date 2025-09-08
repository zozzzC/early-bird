"use client";
import { ICustomerDetailsAndItems } from "@/types/Preorders";
import { Button } from "@mantine/core";
import CartButton from "../order/CartButton";

interface OrderListProps {
  orders: ICustomerDetailsAndItems[];
}

export default function OrderList({ orders }: OrderListProps) {
  return orders.map((order) => {
    return (
      <div className="flex gap-2 outline outline-black p-5" key={order.orderId}>
        <div className="grid grid-cols-4">
          <p className="font-bold">{order.orderId}</p>
          <p>{order.customerDetails.name}</p>
          <p>{order.customerDetails.email}</p>
          <p>{order.customerDetails.pickupDate}</p>
        </div>
        <div>
          <Button>test</Button>
        </div>
      </div>
    );
  });
}
