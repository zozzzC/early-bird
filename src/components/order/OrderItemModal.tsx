import Image from "next/image";
import SingleSelectButton from "./options/SingleSelectButton";
import SingleSelectManager from "./options/SingleSelectManager";

export default function OrderItemModal({ id }: { id: number }) {
  return (
    <div className="w-full h-full grid lg:grid-cols-2 grid-cols-1">
      <div className="w-full lg:h-full lg:max-h-full aspect-square relative">
        <Image
          src={
            "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          fill
          alt="order image"
        />
      </div>
      <div className="flex-1">
        <p>Order Item {id}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          consectetur sed orci sed sagittis. Aenean accumsan luctus justo, non
          mattis enim ornare id. Aliquam justo nibh, sodales ut dui vel, varius
          mattis ipsum. Morbi venenatis, odio sed rutrum tincidunt, arcu felis
          sodales velit, a porta lorem felis eu ante. In hac habitasse platea
          dictumst. Sed sodales sem a leo feugiat, in elementum sem accumsan.
        </p>
        <p>Options</p>
        <SingleSelectManager />
        <p>Add Ons</p>
      </div>
    </div>
  );
}
