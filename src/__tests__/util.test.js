import moment from "moment";

import {
  convertGsheetsDurationToMoment,
  convertStageDatesToDurations,
  displayMomentDuration,
} from "../util";

test("convertGsheetsDurationToMoment returns a Moment.js duration", () => {
  const d = convertGsheetsDurationToMoment(
    new Date("Sat Dec 30 06:54:00 GMT-08:00 1899"),
  );

  expect(moment.isDuration(d)).toBe(true);
});

test("convertStageDatesToDurations converts an array of Dates to Moment.js durations", () => {
  expect.assertions(10);

  const dates = [
    new Date("Sat Dec 30 01:02:00 GMT-08:00 1899"),
    new Date("Sat Dec 30 00:24:00 GMT-08:00 1899"),
    new Date("Sat Dec 30 01:31:00 GMT-08:00 1899"),
    new Date("Sat Dec 30 01:19:00 GMT-08:00 1899"),
    new Date("Sat Dec 30 01:41:00 GMT-08:00 1899"),
    new Date("Sat Dec 30 01:27:00 GMT-08:00 1899"),
    new Date("Sat Dec 30 01:31:00 GMT-08:00 1899"),
    new Date("Sat Dec 30 01:27:00 GMT-08:00 1899"),
    new Date("Sat Dec 30 01:31:00 GMT-08:00 1899"),
    new Date("Sat Dec 30 01:25:00 GMT-08:00 1899"),
  ];
  const durations = convertStageDatesToDurations(dates);

  durations.forEach((d) => {
    expect(moment.isDuration(d)).toBe(true);
  });
});

test("displayMomentDuration outputs a string in the Google Sheets duration format", () => {
  const d = convertGsheetsDurationToMoment(
    new Date("Sat Dec 30 06:54:00 GMT-08:00 1899"),
  );

  const result = displayMomentDuration(d);
  expect(typeof result).toBe("string");
  expect(result).toBe("06:54:00");
});
