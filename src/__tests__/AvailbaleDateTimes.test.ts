describe("check if functions to get min date and times work properly", async () => {
  it.todo(
    "if today is a valid day and time, it returns that we can still order today"
  );
  it.todo(
    "if today is a valid day but after the closing time, it returns that we cannot order today, and the returned minDate is tomorrow, given that tomorrow is an open day"
  );
  it.todo(
    "if today is a valid day but after the closing time, it returns that we cannot order today, and the returned minDate is the next available day, given that tomorrow is a closed day"
  );
  it.todo(
    "if today is not a valid day, it returns that we cannot order today, and the returned minDate is the next available day"
  );
  it.todo(
    "if today is a valid day but our time is before the store opens, then the time returned for the min time is the time the store opens."
  );
  it.todo(
    "if today is a valid day and our time is within store opening hours, then the time returned for the min time is 15 minutes from right now."
  );
  it.todo(
    "if today is a valid day but our time is after the store opens, then the time returned for the min time is the next available day's time"
  );
});
