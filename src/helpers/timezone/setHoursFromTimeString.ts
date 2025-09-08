export default function setHoursFromTimeString(
  date: Date,
  timeString: string,
): Date | undefined {
  try {
    const newDate = new Date(date);
    newDate.setHours(
      parseInt(timeString.split(":")[0] as string),
      parseInt(timeString.split(":")[1] as string),
      parseInt(timeString.split(":")[2] as string),
    );
    return newDate;
  } catch (err) {
    console.error(
      "Could not set hours from time string. Please check the time string is in format HH:MM:SS.",
    );
    return undefined;
  }
}
