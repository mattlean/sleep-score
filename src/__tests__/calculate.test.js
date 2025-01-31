import { calculate } from "../calculate";

describe("calculate", () => {
  it("Date - 1/25, Bedtime Goal - 9:00 PM, Time Asleep Excellent Threshold - 9, Time Asleep Fair Threshold - 7, Time Asleep Poor Threshold - 3, Deep % Goal - 15, REM % Goal - 20, Bedtime - 9:30 PM, Time Asleep - 7:00, Deep - 1:00, REM - 1:30", () => {
    const date = new Date("Sat Jan 01 2025 00:00:00 GMT-0800");
    const bedtimeGoal = new Date("Sat Dec 30 1899 21:00:00 GMT-0800");
    const timeAsleepExcelThreshold = new Date(
      "Sat Dec 30 1899 09:00:00 GMT-0800",
    );
    const timeAsleepFairThreshold = new Date(
      "Sat Dec 30 1899 07:00:00 GMT-0800",
    );
    const timeAsleepPoorThreshold = new Date(
      "Sat Dec 30 1899 03:00:00 GMT-0800",
    );
    const deepGoal = 15;
    const remGoal = 20;
    const bedtime = new Date("Sat Dec 30 1899 21:30:00 GMT-0800");
    const timeAsleep = new Date("Sat Dec 30 1899 07:00:00 GMT-0800");
    const deep = new Date("Sat Dec 30 1899 01:00:00 GMT-0800");
    const rem = new Date("Sat Dec 30 1899 01:30:00 GMT-0800");
    const sleepScore = calculate(
      date,
      bedtimeGoal,
      timeAsleepExcelThreshold,
      timeAsleepFairThreshold,
      timeAsleepPoorThreshold,
      deepGoal,
      remGoal,
      bedtime,
      timeAsleep,
      deep,
      rem,
    );

    expect(sleepScore).toBe(81);
  });

  it("Date - 2/23, Bedtime Goal - 3:00 AM, Time Asleep Excellent Threshold - 7, Time Asleep Fair Threshold - 6, Time Asleep Poor Threshold - 3, Deep % Goal - 15, REM % Goal - 20, Bedtime - 5:41 AM, Time Asleep - 6:54, Deep - 0:28, REM - 1:02", () => {
    const date = new Date("Wed Feb 01 2023 00:00:00 GMT-0800");
    const bedtimeGoal = new Date("Sat Dec 30 1899 03:00:00 GMT-0800");
    const timeAsleepExcelThreshold = new Date(
      "Sat Dec 30 1899 07:00:00 GMT-0800",
    );
    const timeAsleepFairThreshold = new Date(
      "Sat Dec 30 1899 06:00:00 GMT-0800",
    );
    const timeAsleepPoorThreshold = new Date(
      "Sat Dec 30 1899 03:00:00 GMT-0800",
    );
    const deepGoal = 15;
    const remGoal = 20;
    const bedtime = new Date("Sat Dec 30 1899 05:41:00 GMT-0800");
    const timeAsleep = new Date("Sat Dec 30 1899 06:54:00 GMT-0800");
    const deep = new Date("Sat Dec 30 1899 00:28:00 GMT-0800");
    const rem = new Date("Sat Dec 30 1899 01:02:00 GMT-0800");
    const sleepScore = calculate(
      date,
      bedtimeGoal,
      timeAsleepExcelThreshold,
      timeAsleepFairThreshold,
      timeAsleepPoorThreshold,
      deepGoal,
      remGoal,
      bedtime,
      timeAsleep,
      deep,
      rem,
    );

    expect(sleepScore).toBe(75);
  });
});
