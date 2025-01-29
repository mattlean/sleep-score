import moment from "moment";

import {
  convertGsheetsDurationToMomentDuration,
  convertGsheetsDurationsToMomentDurations,
  createMoment,
  outputMoment,
  outputMomentDuration,
} from "../util";

describe("convertGsheetsDurationToMomentDuration", () => {
  it("returns a Moment.js duration", () => {
    const d = convertGsheetsDurationToMomentDuration(
      new Date("Sat Dec 30 06:54:00 GMT-08:00 1899"),
    );

    expect(moment.isDuration(d)).toBe(true);
  });
});

describe("convertGsheetsDurationsToMomentDurations", () => {
  it("converts an array of Dates to Moment.js durations", () => {
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
    const durations = convertGsheetsDurationsToMomentDurations(dates);

    durations.forEach((d) => {
      expect(moment.isDuration(d)).toBe(true);
    });
  });
});

describe("createMoment", () => {
  it("creates a moment using a date and a generic time that exist on two different Date objects", () => {
    const year = 2023;
    const month = 2;
    const day = 1;
    const hour = 15;
    const min = 3;

    const date = new Date(year, month, day);
    const time = new Date(null);
    time.setHours(hour);
    time.setMinutes(min);
    const m = createMoment(date, time);

    expect(moment.isMoment(m)).toBe(true);
    expect(m.year()).toBe(year);
    expect(m.month()).toBe(month);
    expect(m.date()).toBe(day);
    expect(m.hours()).toBe(hour);
    expect(m.minutes()).toBe(min);
  });
});

describe("outputMoment", () => {
  it("outputs a moment as a human readable string", () => {
    const m = moment("2025-01-29 00:17");

    const result = outputMoment(m);
    expect(typeof result).toBe("string");
    expect(result).toBe("01/29/25 - 00:17:00");
  });
});

describe("outputMomentDuration", () => {
  it("outputs a string in the Google Sheets duration format", () => {
    const d = convertGsheetsDurationToMomentDuration(
      new Date("Sat Dec 30 06:54:00 GMT-08:00 1899"),
    );

    const result = outputMomentDuration(d);
    expect(typeof result).toBe("string");
    expect(result).toBe("06:54:00");
  });
});
