export default function formatPrice(price: number): string {
  let nzdFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NZD",
  });
  return nzdFormat.format(price);
}
