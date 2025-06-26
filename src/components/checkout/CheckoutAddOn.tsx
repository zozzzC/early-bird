import formatPrice from "@/helpers/formatPrice";

export default function CheckoutAddOn({
  name,
  price,
}: {
  name: string;
  price: number;
}) {
  return (
    <div className="px-5 flex w-1/3 justify-between">
      <p className="text-sm">{name}</p>
      <p className="text-sm">{price <= 0 ? null : `+ ${formatPrice(price)}`}</p>
    </div>
  );
}
