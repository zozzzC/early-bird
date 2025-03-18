import { Button } from "@mantine/core";

export default function SingleSelect({
  name,
  price,
  select,
}: {
  name: string;
  price: number;
  select: () => void;
}) {
    return (
        <div>
            <Button onClick={select}>{name}</Button>
        </div>
    )
}
