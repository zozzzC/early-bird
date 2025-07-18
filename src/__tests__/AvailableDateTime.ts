import {
  getMinDate,
  isAvailableTime,
  validateDateTime,
} from "@/helpers/getAvailableDateTimes";

describe("check if functions to get min date and times work properly", () => {
  it("if today is a valid day and time, it returns that we can still order today, and the returned minDate is today", () => {
    const validDate = "2027-01-04T09:30:00.000+13:00";
    const { min, max } = isAvailableTime(validDate, new Date(validDate));
    expect(min).toBe("07:15:00");
    expect(max).toBe("13:15:00");
    const { valid } = validateDateTime(validDate, min, max);
    expect(valid).toBe(true);
    const minDate = getMinDate(new Date(validDate));
    expect(minDate).toEqual(new Date("2027-01-04T09:45:00.000"));
  });

  it("if today is a valid day and time (and its sat), it returns that we can still order today, and the returned minDate is today", () => {
    const validDate = "2027-01-09T09:30:00.000+13:00";
    const { min, max } = isAvailableTime(validDate, new Date(validDate));
    expect(min).toBe("08:15:00");
    expect(max).toBe("11:15:00");
    const { valid } = validateDateTime(validDate, min, max);
    expect(valid).toBe(true);
    const minDate = getMinDate(new Date(validDate));
    expect(minDate).toEqual(new Date("2027-01-09T09:45:00.000"));
  });
  it("if today is a valid day but after the closing time, it returns that we cannot order today, and the returned minDate is tomorrow, given that tomorrow is an open day", () => {
    const validDateAfterClose = "2027-01-04T20:30:00.000+13:00";
    const { min, max } = isAvailableTime(
      validDateAfterClose,
      new Date(validDateAfterClose)
    );
    expect(min).toBe("07:15:00");
    expect(max).toBe("13:15:00");
    const { valid } = validateDateTime(validDateAfterClose, min, max);
    expect(valid).toBe(false);
    const minDate = getMinDate(new Date(validDateAfterClose));
    expect(minDate).toEqual(new Date("2027-01-05T07:15:00.000"));
  });
  it("if today is a valid day but after the closing time, it returns that we cannot order today, and the returned minDate is the next available day, given that tomorrow is a closed day", () => {
    const validDateAfterClose = "2027-01-09T20:30:00.000+13:00";
    const { min, max } = isAvailableTime(
      validDateAfterClose,
      new Date(validDateAfterClose)
    );
    expect(min).toBe("08:15:00");
    expect(max).toBe("11:15:00");
    const { valid } = validateDateTime(validDateAfterClose, min, max);
    expect(valid).toBe(false);
    const minDate = getMinDate(new Date(validDateAfterClose));
    expect(minDate).toEqual(new Date("2027-01-11T07:15:00.000"));
  });
  it("if today is not a valid day, it returns that we cannot order today, and the returned minDate is the next available day", () => {
    const invalidDate = "2027-01-10T20:30:00.000+13:00";
    const { min, max } = isAvailableTime(invalidDate, new Date(invalidDate));
    expect(min).toBe(undefined);
    expect(max).toBe(undefined);
    const { valid } = validateDateTime(invalidDate, min, max);
    expect(valid).toBe(false);
    const minDate = getMinDate(new Date(invalidDate));
    expect(minDate).toEqual(new Date("2027-01-11T07:15:00.000"));
  });
  it("if today is a valid day but our time is before the store opens, then the time returned for the min time is the time the store opens.", () => {
    const validDateBeforeOpen = "2027-01-04T02:30:00.000+13:00";
    const { min, max } = isAvailableTime(
      validDateBeforeOpen,
      new Date(validDateBeforeOpen)
    );
    expect(min).toBe("07:15:00");
    expect(max).toBe("13:15:00");
    const { valid } = validateDateTime(validDateBeforeOpen, min, max);
    expect(valid).toBe(false);
    const minDate = getMinDate(new Date(validDateBeforeOpen));

    expect(minDate).toEqual(new Date("2027-01-04T07:15:00.000"));
  });
  it("if today is a valid day and our time is within store opening hours, then the time returned for the min time is 15 minutes from right now.", () => {
    const validDateWhileOpen = "2027-01-04T09:00:00.000+13:00";
    const { min, max } = isAvailableTime(
      validDateWhileOpen,
      new Date(validDateWhileOpen)
    );
    expect(min).toBe("07:15:00");
    expect(max).toBe("13:15:00");
    const { valid } = validateDateTime(validDateWhileOpen, min, max);
    expect(valid).toBe(true);
    const minDate = getMinDate(new Date(validDateWhileOpen));

    expect(minDate).toEqual(new Date("2027-01-04T09:15:00.000"));
  });
});
