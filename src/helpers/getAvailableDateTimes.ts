export function isAvailableDay(date: string) {
  //determines where a day should be available or not
  const newDate = new Date(date);
  if (newDate.getDay() == 0) {
    return false;
  }
  return true;
}

export function isAvailableTime(date: string): {
  min: string | undefined;
  max: string | undefined;
} {
  console.log(date);
  if (!isAvailableDay(date)) {
    return { min: undefined, max: undefined };
  }
  const newDate = new Date(date);

  if (newDate.getDay() == 6) {
    return { min: "08:00:00", max: "11:30:00" };
  }

  return { min: "07:00:00", max: "13:30:00" };
}

export function getMinDate(date: Date): Date | undefined {
  //get today's date and time
  if (isAvailableDay(date.toDateString())) {
    const { max } = isAvailableTime(date.toDateString());
    const maxTimeToday = new Date(date.toISOString());

    console.log(
      maxTimeToday.setHours(
        parseInt(max?.split(":")[0] as string),
        parseInt(max?.split(":")[0] as string),
        parseInt(max?.split(":")[0] as string)
      )
    );

    console.log("dif: " + (maxTimeToday.getTime() - date.getTime()));
    console.log("Max time today: " + maxTimeToday.getTime());

    if (maxTimeToday.getTime() - date.getTime()) {
      //then today is a min date

      console.log("today you can still make an order.");
      return date;
    }
  }

  console.log(
    "cannot make an order today, trying to get next available day to order..."
  );

  const newDate = new Date();
  newDate.setDate(newDate.getDate() + 1);
  newDate.setHours(0, 0, 0, 0);
  console.log(newDate);
  return getMinDate(newDate);
}
