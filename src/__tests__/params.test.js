import moment from "moment";

import { getBedtimeRanges, getStageThresholds } from "../params";
import { outputMomentDuration } from "../util";

describe("getBedtimeRanges", () => {
  it("returns the correct bedtime ranges when the excellent start is set to 9:00 PM", () => {
    const { earlyStart, earlyEnd, excelStart, excelEnd, fairStart, fairEnd } =
      getBedtimeRanges(
        new Date("Wed Feb 01 00:00:00 GMT-08:00 2023"),
        new Date("Sat Dec 30 21:00:00 GMT-08:00 1899"),
      );

    expect(outputMomentDuration(earlyStart)).toBe("20:30:00");
    expect(outputMomentDuration(earlyEnd)).toBe("20:59:00");
    expect(outputMomentDuration(excelStart)).toBe("21:00:00");
    expect(outputMomentDuration(excelEnd)).toBe("23:45:00");
    expect(outputMomentDuration(fairStart)).toBe("23:46:00");
    expect(outputMomentDuration(fairEnd)).toBe("00:30:00");
  });

  it("returns the correct bedtime ranges when the excellent start is set to 12:00 AM", () => {
    const { earlyStart, earlyEnd, excelStart, excelEnd, fairStart, fairEnd } =
      getBedtimeRanges(
        new Date("Wed Feb 01 00:00:00 GMT-08:00 2023"),
        new Date("Sat Dec 30 00:00:00 GMT-08:00 1899"),
      );

    expect(outputMomentDuration(earlyStart)).toBe("23:30:00");
    expect(outputMomentDuration(earlyEnd)).toBe("23:59:00");
    expect(outputMomentDuration(excelStart)).toBe("00:00:00");
    expect(outputMomentDuration(excelEnd)).toBe("02:45:00");
    expect(outputMomentDuration(fairStart)).toBe("02:46:00");
    expect(outputMomentDuration(fairEnd)).toBe("03:30:00");
  });

  it("returns the correct bedtime ranges when the excellent start is set to 6:00 AM", () => {
    const { earlyStart, earlyEnd, excelStart, excelEnd, fairStart, fairEnd } =
      getBedtimeRanges(
        new Date("Wed Feb 01 00:00:00 GMT-08:00 2023"),
        new Date("Sat Dec 30 06:00:00 GMT-08:00 1899"),
      );

    expect(outputMomentDuration(earlyStart)).toBe("05:30:00");
    expect(outputMomentDuration(earlyEnd)).toBe("05:59:00");
    expect(outputMomentDuration(excelStart)).toBe("06:00:00");
    expect(outputMomentDuration(excelEnd)).toBe("08:45:00");
    expect(outputMomentDuration(fairStart)).toBe("08:46:00");
    expect(outputMomentDuration(fairEnd)).toBe("09:30:00");
  });
});

describe("getStageThresholds", () => {
  it("returns the correct sleep stage target durations for the following parameters: Deep 15%, REM 20%, excel time asleep: 9 hours, Fair time asleep: 7 hours", () => {
    const {
      excelDeepThreshold,
      excelRemThreshold,
      fairDeepThreshold,
      fairRemThreshold,
      badStageThreshold,
    } = getStageThresholds(
      moment.duration({ minutes: 9 * 60 }),
      moment.duration({ minutes: 7 * 60 }),
      15,
      20,
    );

    expect(excelDeepThreshold.asMinutes()).toBe(81);
    expect(excelRemThreshold.asMinutes()).toBe(108);
    expect(fairDeepThreshold.asMinutes()).toBe(63);
    expect(fairRemThreshold.asMinutes()).toBe(84);
    expect(badStageThreshold.asMinutes()).toBe(1);
  });

  it("returns the correct sleep stage target durations for the following parameters: Deep 15%, REM 15%, excel time asleep: 6 hours, Fair time asleep: 6 hours", () => {
    const {
      excelDeepThreshold,
      excelRemThreshold,
      fairDeepThreshold,
      fairRemThreshold,
      badStageThreshold,
    } = getStageThresholds(
      moment.duration({ minutes: 7 * 60 }),
      moment.duration({ minutes: 6 * 60 }),
      15,
      20,
    );

    expect(excelDeepThreshold.asMinutes()).toBe(63);
    expect(excelRemThreshold.asMinutes()).toBe(84);
    expect(fairDeepThreshold.asMinutes()).toBe(54);
    expect(fairRemThreshold.asMinutes()).toBe(72);
    expect(badStageThreshold.asMinutes()).toBe(1);
  });

  it("returns the correct sleep stage target durations for the following parameters: Deep 20%, REM 26%, excel time asleep: 8 hours, Fair time asleep: 7 hours", () => {
    const {
      excelDeepThreshold,
      excelRemThreshold,
      fairDeepThreshold,
      fairRemThreshold,
      badStageThreshold,
    } = getStageThresholds(
      moment.duration({ minutes: 8 * 60 }),
      moment.duration({ minutes: 7 * 60 }),
      20,
      26,
    );

    expect(excelDeepThreshold.asMinutes()).toBe(96);
    expect(excelRemThreshold.asMinutes()).toBe(124);
    expect(fairDeepThreshold.asMinutes()).toBe(84);
    expect(fairRemThreshold.asMinutes()).toBe(109);
    expect(badStageThreshold.asMinutes()).toBe(1);
  });
});
