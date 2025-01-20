import moment from "moment";

import { convertGsheetsDurationToMoment, displayMomentDuration } from "../util";

test("convertGsheetsDurationToMoment returns a Moment.js duration", () => {
  const d = convertGsheetsDurationToMoment(
    new Date("Sat Dec 30 06:54:00 GMT-08:00 1899"),
  );

  expect(moment.isDuration(d)).toBe(true);
});

test("displayMomentDuration outputs a string in the Google Sheets duration format", () => {
  const d = convertGsheetsDurationToMoment(
    new Date("Sat Dec 30 06:54:00 GMT-08:00 1899"),
  );

  const result = displayMomentDuration(d);
  expect(typeof result).toBe("string");
  expect(result).toBe("06:54:00");
});
