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
    console.log(date.toDateString() + " T" + max);
    const maxTimeToday = new Date(date.toISOString() + " T" + max);
    console.log(maxTimeToday)

    console.log("dif: " + (maxTimeToday.getTime() - date.getTime()));
    console.log(maxTimeToday.getTime());

    if (maxTimeToday.getTime() - date.getTime()) {
      //then today is a min date

      console.log("today you can still make an order.");
      return date;
    }
    console.log("today you cannot make an order.");
  }

  const newDate = new Date();
  newDate.setDate(date.getDate() + 1);
  console.log(newDate);
  return undefined;
  //   return getMinDate(newDate);
}
