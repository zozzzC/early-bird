import "@mantine/dates/styles.css";
import { Input, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";

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
    <div>
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
      <DateTimePicker label="pickup date and time" minDate={minDate} />
    </div>
  );
}
