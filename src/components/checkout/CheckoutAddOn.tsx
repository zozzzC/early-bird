import formatPrice from "@/helpers/formatPrice";

export default function CheckoutAddOn({
  name,
  price,
}: {
  name: string;
  price: number;
}) {
  return (
    <div className="lg:w-2/5 w-full px-0.5 2sm:px-5 grid grid-cols-2">
      <p className="sm:text-2sm text-sm">{name}</p>
      <p className="sm:text-2sm justify-self-end text-sm">
        {price <= 0 ? null : `+ ${formatPrice(price)}`}
      </p>
    </div>
  );
}
