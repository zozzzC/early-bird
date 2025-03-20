import { Button } from "@mantine/core";

export default function SingleSelect({
  id,
  name,
  price,
  select,
}: {
  id: string,
  name: string;
  price: number;
  select: (id : string) => void;
}) {
    return (
        <div>
            <Button onClick={() => select(id)}>{name}</Button>
        </div>
    )
}
