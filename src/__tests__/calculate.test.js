import { calculate, calculateAll } from "../calculate";

const SESSION_0125 = {
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

const SESSION_0223 = {
  date: new Date("Wed Feb 01 2023 00:00:00 GMT-0800"),
  bedtimeGoal: new Date("Sat Dec 30 1899 03:00:00 GMT-0800"),
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
    } = SESSION_0125;

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

    expect(sleepScore).toBe(75);
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

    expect(sleepScore).toBe(64);
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
    } = buildData(SESSION_0125, SESSION_0223, SESSION_NO_REM_DEEP);

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

    expect(scores.length).toBe(3);
    expect(scores[0]).toBe(81);
    expect(scores[1]).toBe(75);
    expect(scores[2]).toBe(64);
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
    } = buildData(SESSION_0125);

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
    expect(scores[0]).toBe(81);
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
    } = buildData(SESSION_0125);

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
