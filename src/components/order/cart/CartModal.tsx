import { SetStateAction } from "react";
import { useCartContext } from "@/hooks/useCartContext";

export default function CartModal({
  showCartModal,
  setShowCartModal,
}: {
  showCartModal: boolean;
  setShowCartModal: (value: SetStateAction<boolean>) => void;
}) {
  const cart = useCartContext();

  return (
    <div
      className="bg-white-main -z-20 h-56 w-56 overflow-auto rounded-md"
      onMouseEnter={() => setShowCartModal(true)}
      onMouseLeave={() => setShowCartModal(false)}
    >
      {Object.keys(cart.items).map((i) => {
        return (
          <div key={i}>
            <h1>{cart.items[i].name}</h1>
            <p>{cart.items[i].price}</p>
            <p>{cart.items[i].quantity}</p>
          </div>
        );
      })}
    </div>
  );
}
