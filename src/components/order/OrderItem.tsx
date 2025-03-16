import { Item } from "@/types/Item";
import Image from "next/image";

export default function OrderItem({ name, description, photo }: Item) {
  return (
    <div className="h-80 w-80 flex flex-col">
      <div className="h-80 w-80 relative">
        <Image src={photo.toString()} alt={name} fill />
      </div>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}
