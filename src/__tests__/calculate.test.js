import { calculate, calculateAll } from "../calculate";

const SESSION_README = {
  date: new Date("Sat Jan 01 2025 00:00:00 GMT-0800"),
  bedtimeGoal: new Date("Sat Dec 30 1899 21:00:00 GMT-0800"),
  timeAsleepExcelThreshold: new Date("Sat Dec 30 1899 09:00:00 GMT-0800"),
  timeAsleepFairThreshold: new Date("Sat Dec 30 1899 07:00:00 GMT-0800"),
  timeAsleepPoorThreshold: new Date("Sat Dec 30 1899 03:00:00 GMT-0800"),
  deepGoal: 15,
  remGoal: 20,
  bedtime: new Date("Sat Dec 30 1899 21:30:00 GMT-0800"),
  timeAsleep: new Date("Sat Dec 30 1899 07:00:00 GMT-0800"),
  deep: new Date("Sat Dec 30 1899 01:00:00 GMT-0800"),
  rem: new Date("Sat Dec 30 1899 01:30:00 GMT-0800"),
};
const SESSION_README_SCORE = 81;

const SESSION_0223 = {
  date: new Date("Wed Feb 01 2023 00:00:00 GMT-0800"),
  bedtimeGoal: new Date("Sat Dec 30 1899 02:15:00 GMT-0800"),
  timeAsleepExcelThreshold: new Date("Sat Dec 30 1899 07:00:00 GMT-0800"),
  timeAsleepFairThreshold: new Date("Sat Dec 30 1899 06:00:00 GMT-0800"),
  timeAsleepPoorThreshold: new Date("Sat Dec 30 1899 03:00:00 GMT-0800"),
  deepGoal: 15,
  remGoal: 20,
  bedtime: new Date("Sat Dec 30 1899 05:41:00 GMT-0800"),
  timeAsleep: new Date("Sat Dec 30 1899 06:54:00 GMT-0800"),
  deep: new Date("Sat Dec 30 1899 00:28:00 GMT-0800"),
  rem: new Date("Sat Dec 30 1899 01:02:00 GMT-0800"),
};
const SESSION_0223_SCORE = 70;

const SESSION_0524 = {
  date: new Date("Wed May 01 2024 00:00:00 GMT-0800"),
  bedtimeGoal: new Date("Sat Dec 30 1899 00:15:00 GMT-0800"),
  timeAsleepExcelThreshold: new Date("Sat Dec 30 1899 07:00:00 GMT-0800"),
  timeAsleepFairThreshold: new Date("Sat Dec 30 1899 06:00:00 GMT-0800"),
  timeAsleepPoorThreshold: new Date("Sat Dec 30 1899 03:00:00 GMT-0800"),
  deepGoal: 15,
  remGoal: 20,
  bedtime: new Date("Sat Dec 30 1899 05:09:00 GMT-0800"),
  timeAsleep: new Date("Sat Dec 30 1899 06:44:00 GMT-0800"),
  deep: new Date("Sat Dec 30 1899 01:11:00 GMT-0800"),
  rem: new Date("Sat Dec 30 1899 01:26:00 GMT-0800"),
};
const SESSION_0524_SCORE = 67;

const SESSION_NO_REM_DEEP = {
  date: new Date("Sat Feb 01 2025 00:00:00 GMT-0800"),
  bedtimeGoal: new Date("Sat Dec 30 1899 00:00:00 GMT-0800"),
  timeAsleepExcelThreshold: new Date("Sat Dec 30 1899 08:00:00 GMT-0800"),
  timeAsleepFairThreshold: new Date("Sat Dec 30 1899 06:00:00 GMT-0800"),
  timeAsleepPoorThreshold: new Date("Sat Dec 30 1899 03:00:00 GMT-0800"),
  deepGoal: 15,
  remGoal: 20,
  bedtime: new Date("Sat Dec 30 1899 00:00:00 GMT-0800"),
  timeAsleep: new Date("Sat Dec 30 1899 02:30:00 GMT-0800"),
  deep: "",
  rem: "",
};
const SESSION_NO_REM_DEEP_SCORE = 64;

/**
 * Build mock spreadsheet data from individual session parameters.
 *
 * @param {Array.<Object>} args An array where each item are the parameters for an individual session
 * @returns {Object.<string, Date|number>} An object that contains the mock spreadsheet data
 */
const buildData = (...args) => {
  const data = {
    dates: [],
    bedtimeGoals: [],
    timeAsleepExcelThresholds: [],
    timeAsleepFairThresholds: [],
    timeAsleepPoorThresholds: [],
    deepGoals: [],
    remGoals: [],
    bedtimes: [],
    timesAsleep: [],
    deeps: [],
    rems: [],
  };

  for (const session of args) {
    data.dates.push(session.date);
    data.bedtimeGoals.push(session.bedtimeGoal);
    data.timeAsleepExcelThresholds.push(session.timeAsleepExcelThreshold);
    data.timeAsleepFairThresholds.push(session.timeAsleepFairThreshold);
    data.timeAsleepPoorThresholds.push(session.timeAsleepPoorThreshold);
    data.deepGoals.push(session.deepGoal);
    data.remGoals.push(session.remGoal);
    data.bedtimes.push(session.bedtime);
    data.timesAsleep.push(session.timeAsleep);
    data.deeps.push(session.deep);
    data.rems.push(session.rem);
  }

  return data;
};

describe("calculate", () => {
  it("Example from README\nDate - 1/25, Bedtime Goal - 9:00 PM, Time Asleep Excellent Threshold - 9, Time Asleep Fair Threshold - 7, Time Asleep Poor Threshold - 3, Deep % Goal - 15, REM % Goal - 20, Bedtime - 9:30 PM, Time Asleep - 7:00, Deep - 1:00, REM - 1:30", () => {
    const {
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
    } = SESSION_README;

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

    expect(sleepScore).toBe(SESSION_README_SCORE);
  });

  it("Date - 2/23, Bedtime Goal - 3:00 AM, Time Asleep Excellent Threshold - 7, Time Asleep Fair Threshold - 6, Time Asleep Poor Threshold - 3, Deep % Goal - 15, REM % Goal - 20, Bedtime - 5:41 AM, Time Asleep - 6:54, Deep - 0:28, REM - 1:02", () => {
    const {
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
    } = SESSION_0223;

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

    expect(sleepScore).toBe(SESSION_0223_SCORE);
  });

  it("Date - 5/24, Bedtime Goal - 12:15 AM, Time Asleep Excellent Threshold - 7, Time Asleep Fair Threshold - 6, Time Asleep Poor Threshold - 3, Deep % Goal - 15, REM % Goal - 20, Bedtime - 5:09 AM, Time Asleep - 6:44, Deep - 1:11, REM - 1:26", () => {
    const {
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
    } = SESSION_0524;

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

    expect(sleepScore).toBe(SESSION_0524_SCORE);
  });

  it("Example where Deep & REM were not measured\nDate - 2/25, Bedtime Goal - 12:00 AM, Time Asleep Excellent Threshold - 8, Time Asleep Fair Threshold - 6, Time Asleep Poor Threshold - 3, Deep % Goal - 15, REM % Goal - 20, Bedtime - 12:00 AM, Time Asleep - 2:30, Deep - 0:00, REM - 0:00", () => {
    const {
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
    } = SESSION_NO_REM_DEEP;

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

    expect(sleepScore).toBe(SESSION_NO_REM_DEEP_SCORE);
  });

  it("Example where no sleep occurred", () => {
    const sleepScore = calculate(
      new Date("Sat Feb 01 2025 00:00:00 GMT-0800"),
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    );

    expect(sleepScore).toBe(0);
  });
});

describe("calculateAll", () => {
  it("calculates multiple sessions and returns a score for each one of them", () => {
    const {
      dates,
      bedtimeGoals,
      timeAsleepExcelThresholds,
      timeAsleepFairThresholds,
      timeAsleepPoorThresholds,
      deepGoals,
      remGoals,
      bedtimes,
      timesAsleep,
      deeps,
      rems,
    } = buildData(
      SESSION_README,
      SESSION_0223,
      SESSION_0524,
      SESSION_NO_REM_DEEP,
    );

    const scores = calculateAll(
      dates,
      bedtimeGoals,
      timeAsleepExcelThresholds,
      timeAsleepFairThresholds,
      timeAsleepPoorThresholds,
      deepGoals,
      remGoals,
      bedtimes,
      timesAsleep,
      deeps,
      rems,
    );

    expect(scores.length).toBe(4);
    expect(scores[0]).toBe(SESSION_README_SCORE);
    expect(scores[1]).toBe(SESSION_0223_SCORE);
    expect(scores[2]).toBe(SESSION_0524_SCORE);
    expect(scores[3]).toBe(64);
  });

  it("calculates one session and return a score for it", () => {
    const {
      dates,
      bedtimeGoals,
      timeAsleepExcelThresholds,
      timeAsleepFairThresholds,
      timeAsleepPoorThresholds,
      deepGoals,
      remGoals,
      bedtimes,
      timesAsleep,
      deeps,
      rems,
    } = buildData(SESSION_README);

    const scores = calculateAll(
      dates,
      bedtimeGoals,
      timeAsleepExcelThresholds,
      timeAsleepFairThresholds,
      timeAsleepPoorThresholds,
      deepGoals,
      remGoals,
      bedtimes,
      timesAsleep,
      deeps,
      rems,
    );

    expect(scores.length).toBe(1);
    expect(scores[0]).toBe(SESSION_README_SCORE);
  });

  it("returns an empty array when empty parameter arrays are passed in", () => {
    const scores = calculateAll([], [], [], [], [], [], [], [], [], [], []);

    expect(scores.length).toBe(0);
  });

  it("throws an error when parameter arrays do not match in size", () => {
    const {
      dates,
      bedtimeGoals,
      timeAsleepExcelThresholds,
      timeAsleepFairThresholds,
      timeAsleepPoorThresholds,
      deepGoals,
      bedtimes,
      timesAsleep,
      deeps,
      rems,
    } = buildData(SESSION_README);

    expect(() => {
      calculateAll(
        dates,
        bedtimeGoals,
        timeAsleepExcelThresholds,
        timeAsleepFairThresholds,
        timeAsleepPoorThresholds,
        deepGoals,
        [1, 2, 3, 4, 5],
        bedtimes,
        timesAsleep,
        deeps,
        rems,
      );
    }).toThrow(/Parameter arrays do not match in size./);
  });
});
