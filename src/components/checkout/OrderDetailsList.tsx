"use client";
import {
  getMinDate,
  isAvailableDay,
  isAvailableTime,
  validateDateTime,
} from "@/helpers/getAvailableDateTimes";
import { Button, InputBase, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { useState } from "react";
import { IMaskInput } from "react-imask";

export default function OrderDetailsList() {
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
      phone: hasLength(
        //TODO: not working cause of the mask.
        { min: 8, max: 10 },
        "Phone number must be between 8-10 digits long."
      ),
      date: () => {
        if (validateDateTime(selectedDate, minTime, maxTime).valid) {
          return null;
        }
        return `Please select a time between ${minTime} - ${maxTime} for this date.`;
      },
    },
  });

  const [minTime, setMinTime] = useState<string | undefined>(undefined);
  const [maxTime, setMaxTime] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );

  console.log(minTime);
  console.log(maxTime);
  return (
    <div className="p-5 flex flex-col items-center ">
      <form onSubmit={form.onSubmit(() => {})}>
        <TextInput
          className="w-2/3"
          withAsterisk
          label="name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <TextInput
          className="w-2/3"
          withAsterisk
          label="email"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <InputBase
          className="w-2/3"
          withAsterisk
          label="phone number"
          key={form.key("phone")}
          component={IMaskInput}
          mask="+64 (000) 000-0000"
          {...form.getInputProps("phone")}
        />
        <DateTimePicker
          key={form.key("date")}
          {...form.getInputProps("date")}
          withAsterisk
          label="pickup date and time"
          minDate={getMinDate(new Date())}
          onChange={(date) => {
            if (date != null) {
              const { min, max } = isAvailableTime(date);
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
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
}
