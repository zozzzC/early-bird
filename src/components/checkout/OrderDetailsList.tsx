"use client";
import checkIfInvalid from "@/helpers/checkIfInvalid";
import {
  getMinDate,
  isAvailableDay,
  isAvailableTime,
  validateDateTime,
} from "@/helpers/getAvailableDateTimes";
import { useCartContext } from "@/hooks/useCartContext";
import type { CustomerDetails } from "@/types/CustomerDetails";
import type { OrderModalResponse } from "@/types/OrderModalResponse";
import { InputBase, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useRef, useState } from "react";
import { IMaskInput } from "react-imask";
import ContinueButton from "./ContinueButton";

export default function OrderDetailsList({
  orderItems,
}: {
  orderItems: OrderModalResponse[];
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
    },
    validate: {
      name: hasLength(
        { min: 2, max: 100 },
        "Name must be between 2-100 characters long."
      ),
      email: isEmail("Invalid email."),
      phone: () => {
        console.log(ref.current?.maskRef.unmaskedValue);
        if (
          ref.current?.maskRef.unmaskedValue.length > 7 &&
          ref.current?.maskRef.unmaskedValue.length < 11
        ) {
          return null;
        }
        return "Phone number must be between 8-10 digits.";
      },
      date: () => {
        if (validateDateTime(selectedDate, minTime, maxTime).valid) {
          return null;
        }

        if (minTime == undefined) {
          return `Please select a date and time to pickup.`;
        }

        return `Please select a time between ${minTime} - ${maxTime} for this date.`;
      },
    },
  });

  const { itemsArray } = useCartContext();
  const customerDetailsRef = useRef<CustomerDetails | null>(null);
  const [minTime, setMinTime] = useState<string | undefined>(undefined);
  const [maxTime, setMaxTime] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const ref = useRef(null);

  return (
    <div className=" flex flex-col items-center ">
      {itemsArray.length != 0 ? (
        <form
          onSubmit={form.onSubmit((values) => {
            if (
              !checkIfInvalid(itemsArray, orderItems) &&
              itemsArray.length != 0 &&
              form.isValid()
            ) {
              console.log("we can continue.");
            } else {
              console.error("Still need to delete some items.");
            }

            customerDetailsRef.current = {
              name: values.name,
              email: values.email,
              phone: values.phone,
              pickupDate: values.date,
              createdDate: new Date().toISOString(),
            };
            return;
          })}
        >
          <TextInput
            withAsterisk
            label="name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <InputBase
            withAsterisk
            label="phone number"
            key={form.key("phone")}
            component={IMaskInput}
            mask="+64 (000) 000-0000"
            {...form.getInputProps("phone")}
            ref={ref}
          />
          <DateTimePicker
            key={form.key("date")}
            {...form.getInputProps("date")}
            withAsterisk
            label="pickup date and time"
            minDate={getMinDate(new Date())}
            onChange={(date) => {
              if (date != null) {
                const { min, max } = isAvailableTime(date, new Date());
                setSelectedDate(date);
                setMinTime(min);
                setMaxTime(max);
              }
            }}
            timePickerProps={{
              withDropdown: true,
              min: minTime,
              max: maxTime,
              popoverProps: { withinPortal: false },
              minutesStep: 10,
              format: "12h",
            }}
            excludeDate={(date) => !isAvailableDay(date)}
          />
          <div className="py-5 flex justify-center">
            <ContinueButton />
          </div>
        </form>
      ) : null}
    </div>
  );
}
