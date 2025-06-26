import formatPrice from "@/helpers/formatPrice";

export default function CheckoutAddOn({
  name,
  price,
}: {
  name: string;
  price: number;
}) {
  return (
    <div className="xl:w-1/3 px-0.5 2sm:px-5 grid outline grid-cols-2">
      <p className="sm:text-2sm text-sm outline">{name}</p>
      <p className="sm:text-2sm text-sm outline">
        {price <= 0 ? null : `+ ${formatPrice(price)}`}
      </p>
    </div>
  );
}
