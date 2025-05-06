import Image from "next/image";
import SingleSelectButton from "./options/SingleSelectButton";
import SingleSelectManager from "./options/SingleSelectManager";
import MultiSelectManager from "./options/MultiSelectManager";
import { Button, NumberInput } from "@mantine/core";
import { useState } from "react";
import { TotalContext } from "@/hooks/TotalContext";
import { useOrderItemContext } from "@/hooks/useOrderItemContext";

export default function OrderItemModal({ id }: { id: string }) {
  const [quantity, setQuantity] = useState<number>(1);
  const orderItem = useOrderItemContext();
  const [total, setTotal] = useState<number>(orderItem.price.number);

  return (
    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-5">
      <TotalContext value={{ total, setTotal }}>
        <div className="w-full lg:h-full lg:max-h-full aspect-square relative">
          {orderItem.media.files[0] ? (
            <Image
              src={orderItem.media.files[0].file.url}
              fill
              alt="order image"
            />
          ) : (
            <Image
              src={
                "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
              fill
              alt="order image"
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col">
              <p className="text-3xl">{orderItem.name.title[0].text.content}</p>
              <p className="text-md pb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                consectetur sed orci sed sagittis. Aenean accumsan luctus justo,
                non mattis enim ornare id. Aliquam justo nibh, sodales ut dui
                vel, varius mattis ipsum. Morbi venenatis, odio sed rutrum
                tincidunt, arcu felis sodales velit, a porta lorem felis eu
                ante. In hac habitasse platea dictumst. Sed sodales sem a leo
                feugiat, in elementum sem accumsan.
              </p>
              <p>Options</p>
              <SingleSelectManager id={id} />
              <p>Add Ons</p>
              <MultiSelectManager id={id} />
            </div>

            <div className="w-full">
              <div className="gap-5 pr-5 flex justify-end w-full items-center">
                <NumberInput
                  size="md"
                  className="w-16"
                  variant="filled"
                  defaultValue={1}
                  min={1}
                ></NumberInput>
              </div>
              <div className="flex justify-end w-full p-5">
                <div className="">
                  <p className="text-lg">{total}</p>
                </div>
              </div>
              <Button>add to cart</Button>
            </div>
          </div>
        </div>
      </TotalContext>
    </div>
  );
}
