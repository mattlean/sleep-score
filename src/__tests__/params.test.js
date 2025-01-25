import { getBedtimeRanges, getStageDurations } from "../params";

const FORMAT = "HH:mm:ss";

test("getBedtimeRanges returns the correct bedtime ranges when the excellent start is set to 9:00 PM", () => {
  const result = getBedtimeRanges(
    new Date("Sat Dec 30 21:00:00 GMT-08:00 1899"),
  );

  expect(result.earlyStart.format(FORMAT)).toBe("20:30:00");
  expect(result.earlyEnd.format(FORMAT)).toBe("20:59:00");
  expect(result.excellentStart.format(FORMAT)).toBe("21:00:00");
  expect(result.excellentEnd.format(FORMAT)).toBe("23:45:00");
  expect(result.fairStart.format(FORMAT)).toBe("23:46:00");
  expect(result.fairEnd.format(FORMAT)).toBe("00:30:00");
});

test("getBedtimeRanges returns the correct bedtime ranges when the excellent start is set to 12:00 AM", () => {
  const result = getBedtimeRanges(
    new Date("Sat Dec 30 00:00:00 GMT-08:00 1899"),
  );

  expect(result.earlyStart.format(FORMAT)).toBe("23:30:00");
  expect(result.earlyEnd.format(FORMAT)).toBe("23:59:00");
  expect(result.excellentStart.format(FORMAT)).toBe("00:00:00");
  expect(result.excellentEnd.format(FORMAT)).toBe("02:45:00");
  expect(result.fairStart.format(FORMAT)).toBe("02:46:00");
  expect(result.fairEnd.format(FORMAT)).toBe("03:30:00");
});

test("getBedtimeRanges returns the correct bedtime ranges when the excellent start is set to 6:00 AM", () => {
  const result = getBedtimeRanges(
    new Date("Sat Dec 30 06:00:00 GMT-08:00 1899"),
  );

  expect(result.earlyStart.format(FORMAT)).toBe("05:30:00");
  expect(result.earlyEnd.format(FORMAT)).toBe("05:59:00");
  expect(result.excellentStart.format(FORMAT)).toBe("06:00:00");
  expect(result.excellentEnd.format(FORMAT)).toBe("08:45:00");
  expect(result.fairStart.format(FORMAT)).toBe("08:46:00");
  expect(result.fairEnd.format(FORMAT)).toBe("09:30:00");
});

test("getStageDurations returns the correct sleep stage target durations for the following parameters: Deep 15%, REM 20%, Excellent time asleep: 9 hours, Fair time asleep: 7 hours", () => {
  const result = getStageDurations({
    deepPercent: 15,
    remPercent: 20,
    efficientTimeAsleepMin: 9 * 60,
    fairTimeAsleepMin: 7 * 60,
  });

  expect(result.efficientDeep.asMinutes()).toBe(81);
  expect(result.efficientRem.asMinutes()).toBe(108);
  expect(result.fairDeep.asMinutes()).toBe(63);
  expect(result.fairRem.asMinutes()).toBe(84);
});

test("getStageDurations returns the correct sleep stage target durations for the following parameters: Deep 15%, REM 15%, Excellent time asleep: 6 hours, Fair time asleep: 6 hours", () => {
  const result = getStageDurations({
    deepPercent: 15,
    remPercent: 20,
    efficientTimeAsleepMin: 7 * 60,
    fairTimeAsleepMin: 6 * 60,
  });

  expect(result.efficientDeep.asMinutes()).toBe(63);
  expect(result.efficientRem.asMinutes()).toBe(84);
  expect(result.fairDeep.asMinutes()).toBe(54);
  expect(result.fairRem.asMinutes()).toBe(72);
});

test("getStageDurations returns the correct sleep stage target durations for the following parameters: Deep 20%, REM 26%, Excellent time asleep: 8 hours, Fair time asleep: 7 hours", () => {
  const result = getStageDurations({
    deepPercent: 20,
    remPercent: 26,
    efficientTimeAsleepMin: 8 * 60,
    fairTimeAsleepMin: 7 * 60,
  });

  expect(result.efficientDeep.asMinutes()).toBe(96);
  expect(Math.floor(result.efficientRem.asMinutes())).toBe(124);
  expect(result.fairDeep.asMinutes()).toBe(84);
  expect(Math.floor(result.fairRem.asMinutes())).toBe(109);
});
