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
  console.log(`attempting to get available times for ${date}`);
  if (!isAvailableDay(date)) {
    return { min: undefined, max: undefined };
  }
  // const today = new Date();
  const today = new Date();
  //allow at least 15 minutes for the order to go through and process.
  today.setMinutes(today.getMinutes() + 15);
  const selectedDate = new Date(date);

  if (selectedDate.getDay() == 6) {
    //now we want to return whichever is greater -- either today at 8 AM or today at current time
    selectedDate.setHours(8, 15, 0, 0);

    let minTime = `${today.getHours().toString().padStart(2, "0")}:${today.getMinutes().toString().padStart(2, "0")}:${today.getSeconds().toString().padStart(2, "0")}`;

    //if today's time is greater than the min time then the min time is now the current time.
    if (today.getTime() - selectedDate.getTime()) {
      minTime = `${selectedDate.getHours().toString().padStart(2, "0")}:${selectedDate.getMinutes().toString().padStart(2, "0")}:${selectedDate.getSeconds().toString().padStart(2, "0")}`;
    }

    console.log(`min: ${minTime} `);
    return { min: minTime, max: "11:15:00" };
  }

  selectedDate.setHours(7, 15, 0, 0);

  let minTime = `${today.getHours().toString().padStart(2, "0")}:${today.getMinutes().toString().padStart(2, "0")}:${today.getSeconds().toString().padStart(2, "0")}`;
  //if today's time is greater than the min time then the min time is now the
  if (today.getTime() - selectedDate.getTime()) {
    minTime = `${selectedDate.getHours().toString().padStart(2, "0")}:${selectedDate.getMinutes().toString().padStart(2, "0")}:${selectedDate.getSeconds().toString().padStart(2, "0")}`;
  }

  console.log(`min: ${minTime} `);

  return { min: minTime, max: "13:15:00" };
}

export function getMinDate(date: Date): Date {
  date.setMinutes(date.getMinutes() + 15);
  //get today's date and time
  if (isAvailableDay(date.toDateString())) {
    const { max } = isAvailableTime(date.toDateString());
    const maxTimeToday = new Date(date.toISOString());

    maxTimeToday.setHours(
      parseInt(max?.split(":")[0] as string),
      parseInt(max?.split(":")[0] as string),
      parseInt(max?.split(":")[0] as string)
    );

    if (maxTimeToday.getTime() - date.getTime() > 0) {
      //then today is a min date

      console.log(
        "Next available day to make an order is " + date.toDateString()
      );
      return date;
    }
  }

  console.log(
    `Cannot make an order on ${date.toDateString()}, trying to get next available day to order...`
  );

  const newDate = new Date();
  newDate.setDate(newDate.getDate() + 1);
  newDate.setHours(0, 0, 0, 0);
  console.log(newDate);
  return getMinDate(newDate);
}

export function validateDateTime(
  date: string | undefined,
  minTime: string | undefined,
  maxTime: string | undefined
): { valid: boolean } {
  if (date == undefined || minTime == undefined || maxTime == undefined) {
    return { valid: false };
  }

  const selectedDate = new Date(date as string);

  const { min, max } = isAvailableTime(date as string);

  //ensures that the selected date is both after the min time and before the max time

  const minTimeForDate = new Date(date as string);
  minTimeForDate.setHours(
    parseInt((min as string).split(":")[0]),
    parseInt((min as string).split(":")[1]),
    parseInt((min as string).split(":")[2]),
    0
  );

  const maxTimeForDate = new Date(date as string);
  maxTimeForDate.setHours(
    parseInt((max as string).split(":")[0]),
    parseInt((max as string).split(":")[1]),
    parseInt((max as string).split(":")[2]),
    0
  );

  console.log(`Selected date: ${date}`);
  console.log(
    `Min time for date is: ${minTimeForDate} \n Max time for date is: ${maxTimeForDate}`
  );

  //if the date is greater than the min time and less than the max time then it is valid.
  if (
    selectedDate.getTime() - minTimeForDate.getTime() >= 0 &&
    maxTimeForDate.getTime() - selectedDate.getTime() >= 0
  ) {
    console.log("Valid time.");
    return { valid: true };
  }
  console.log("Invalid time.");
  return { valid: false };
}
