import { Item } from "@/types/Item";
import Image from "next/image";

export default function OrderItem({ name, description, photo }: Item) {
  return (
    <div className="h-20">
      <Image src={photo.toString()} alt={name} />
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}
