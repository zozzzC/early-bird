import { useOrderInstanceContext } from "@/hooks/useOrderInstanceContext";

export default function Total() {
  const orderInstance = useOrderInstanceContext();

  return <p>{orderInstance.orderInstance?.price}</p>;
}
