import { Item } from "@/types/Item";
import Image from "next/image";

export default function OrderItem({ name, description, photo }: Item) {
  return (
    <div className="h-full flex flex-col relative items-center">
      <div className="grow-1 object-cover w-full h-full max-w-80 relative aspect-square">
        <Image src={photo.toString()} alt={name} objectFit="cover" fill />
      </div>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}
