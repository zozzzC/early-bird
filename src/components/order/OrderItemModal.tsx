import Image from "next/image";
import SingleSelectButton from "./options/SingleSelectButton";

export default function OrderItemModal({ id }: { id: number }) {
  function select(id: string) {
    console.log(id);
  }

  return (
    <div className="w-full h-full grid lg:grid-cols-2 grid-cols-1">
      <div className="w-full lg:h-full lg:max-h-full max-h-1/2 aspect-square relative">
        <Image
          src={
            "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          fill
          alt="order image"
        />
      </div>
      <div>
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
        <SingleSelectButton id={"1"} name={"name"} price={2} select={select} />
        <p>Add Ons</p>
      </div>
    </div>
  );
}
