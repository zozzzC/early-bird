"use client";
import {
  getMinDate,
  isAvailableDay,
  isAvailableTime,
  validateDateTime,
} from "@/helpers/getAvailableDateTimes";
import { InputBase, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";
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
  });

  const [minTime, setMinTime] = useState<string | undefined>(undefined);
  const [maxTime, setMaxTime] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );
  const [showNotif, setShowNotif] = useState<boolean>(false);

  console.log(minTime);
  console.log(maxTime);
  return (
    <div className="p-5 flex flex-col items-center ">
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
        label="pickup date and time"
        minDate={getMinDate(new Date())}
        onChange={(date) => {
          if (date != null) {
            console.log(`Date changed to: ${date}`);

            const { min, max } = isAvailableTime(date);
            setSelectedDate(date);
            setMinTime(min);
            setMaxTime(max);
            const { valid } = validateDateTime(date, min, max);
            console.log(valid)
            //if our selected time is before or after the min / max time then we show notif.
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
        submitButtonProps={{
          onClick: () => {
            //before submit we need to ensure that the time selected is indeed valid.
            validateDateTime(selectedDate, minTime, maxTime);
          },
        }}
        excludeDate={(date) => !isAvailableDay(date)}
      />
    </div>
  );
}
