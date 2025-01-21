import { setBedtimeRanges, setStageRanges } from "../params";

test("setBedTimeRanges returns the correct bedtime ranges when the optimal start is set to 12:00 AM", () => {
  const result = setBedtimeRanges(
    new Date("Sat Dec 30 00:00:00 GMT-08:00 1899"),
  );
  const FORMAT = "HH:mm:ss";

  expect(result.optimalStart.format(FORMAT)).toBe("00:00:00");
  expect(result.optimalEnd.format(FORMAT)).toBe("02:45:00");
  expect(result.fairStart.format(FORMAT)).toBe("02:46:00");
  expect(result.fairEnd.format(FORMAT)).toBe("03:30:00");
});

test("setBedTimeRanges returns the correct bedtime ranges when the optimal start is set to 6:00 AM", () => {
  const result = setBedtimeRanges(
    new Date("Sat Dec 30 06:00:00 GMT-08:00 1899"),
  );
  const FORMAT = "HH:mm:ss";

  expect(result.optimalStart.format(FORMAT)).toBe("06:00:00");
  expect(result.optimalEnd.format(FORMAT)).toBe("08:45:00");
  expect(result.fairStart.format(FORMAT)).toBe("08:46:00");
  expect(result.fairEnd.format(FORMAT)).toBe("09:30:00");
});

test("setStageRanges returns the correct sleep stage target durations for the following parameters: Deep 15%, REM 15%, Optimal time asleep: 6 hours, Fair time asleep: 6 hours", () => {
  const result = setStageRanges({
    deepPercent: 15,
    remPercent: 20,
    optimalTimeAsleepMin: 7 * 60,
    fairTimeAsleepMin: 6 * 60,
  });

  expect(result.optimalDeep.asMinutes()).toBe(63);
  expect(result.optimalRem.asMinutes()).toBe(84);
  expect(result.fairDeep.asMinutes()).toBe(54);
  expect(result.fairRem.asMinutes()).toBe(72);
});

test("setStageRanges returns the correct sleep stage target durations for the following parameters: Deep 20%, REM 26%, Optimal time asleep: 8 hours, Fair time asleep: 7 hours", () => {
  const result = setStageRanges({
    deepPercent: 20,
    remPercent: 26,
    optimalTimeAsleepMin: 8 * 60,
    fairTimeAsleepMin: 7 * 60,
  });

  expect(result.optimalDeep.asMinutes()).toBe(96);
  expect(Math.floor(result.optimalRem.asMinutes())).toBe(124);
  expect(result.fairDeep.asMinutes()).toBe(84);
  expect(Math.floor(result.fairRem.asMinutes())).toBe(109);
});
