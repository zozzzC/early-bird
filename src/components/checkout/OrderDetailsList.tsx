"use client";
import { TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useForm } from "@mantine/form";

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

  const minDate = new Date();
  minDate.setHours(minDate.getHours() + 2);
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
      <DateTimePicker
        label="pickup date and time"
        timePickerProps={{
          withDropdown: true,
          popoverProps: { withinPortal: false },
          minutesStep: 10,
          format: "12h",
        }}
      />
    </div>
  );
}
