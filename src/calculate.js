/* global Logger */
import moment from "moment";

import { getBedtimeRanges, getStageThresholds } from "./params";
import {
  convertGsheetsDurationToMomentDuration,
  createMoment,
  outputMoment,
  outputMomentDuration,
} from "./util";

/**
 * Calculate a sleep score for a sleep session.
 *
 * Note that data related to durations are input as a Date object as Apps Script extracts
 * durations as Date objects. For these particular Date objects, any data besides the
 * hours, minutes, and seconds can be safely ignored.
 *
 * @param {Date} date Date for the session
 * @param {Date} bedtimeGoal Bedtime goal
 * @param {Date} timeAsleepExcelThreshold Threshold for excellent time asleep
 * @param {Date} timeAsleepFairThreshold Threshold for fair time asleep
 * @param {Date} timeAsleepPoorThreshold Threshold for poor time asleep
 * @param {number} deepGoal Deep sleep percentage goal
 * @param {number} remGoal REM sleep percentage goal
 * @param {Date} bedtime Bedtime metric
 * @param {Date} timeAsleep Time asleep metric
 * @param {Date} deep Deep sleep metric
 * @param {Date} rem REM sleep metric
 * @param {boolean=} showLogs Flag that will show logs in console when set to true
 * @returns {number} A sleep score.
 */
export const calculate = (
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
  showLogs,
) => {
  if (!date) {
    throw new Error("Date was not found.");
  }

  if (!bedtimeGoal) {
    throw new Error("Bedtime goal was not found.");
  }

  if (!timeAsleepExcelThreshold) {
    throw new Error("Excellent time asleep minimum was not found.");
  }

  if (!timeAsleepFairThreshold) {
    throw new Error("Fair time asleep minimum was not found.");
  }

  if (!timeAsleepPoorThreshold) {
    throw new Error("Poor time asleep minimum was not found.");
  }

  if (!deepGoal) {
    throw new Error("Deep sleep percentage goal was not found.");
  }

  if (!remGoal) {
    throw new Error("REM sleep percentage goal was not found.");
  }

  if (!bedtime) {
    throw new Error("Bedtime was not found.");
  }

  if (!timeAsleep) {
    throw new Error("Time asleep was not found.");
  }

  if (deep === undefined) {
    throw new Error("Deep sleep was not found.");
  }

  if (rem === undefined) {
    throw new Error("REM sleep was not found.");
  }

  const timeAsleepDuration = convertGsheetsDurationToMomentDuration(timeAsleep);
  const timeAsleepExcelThresholdDuration =
    convertGsheetsDurationToMomentDuration(timeAsleepExcelThreshold);
  const timeAsleepFairThresholdDuration =
    convertGsheetsDurationToMomentDuration(timeAsleepFairThreshold);
  const timeAsleepPoorThresholdDuration =
    convertGsheetsDurationToMomentDuration(timeAsleepPoorThreshold);
  const deepDuration = deep
    ? convertGsheetsDurationToMomentDuration(deep)
    : null;
  const remDuration = rem ? convertGsheetsDurationToMomentDuration(rem) : null;

  if (showLogs) {
    Logger.info("[ INIT PARAMS ]");
    Logger.info(`Date: ${date}`);
    Logger.info(`Bedtime Goal: ${bedtimeGoal}`);
    Logger.info(
      `Time Asleep Excellent Goal: ${timeAsleepExcelThreshold} (${outputMomentDuration(timeAsleepExcelThresholdDuration)})`,
    );
    Logger.info(
      `Time Asleep Fair Goal: ${timeAsleepFairThreshold} (${outputMomentDuration(timeAsleepFairThresholdDuration)})`,
    );
    Logger.info(
      `Time Asleep Poor Goal: ${timeAsleepPoorThreshold} (${outputMomentDuration(timeAsleepPoorThresholdDuration)})`,
    );
    Logger.info(`Deep % Goal: ${deepGoal}`);
    Logger.info(`REM % Goal: ${remGoal}`);

    Logger.info("[ METRIC PARAMS ]");
    Logger.info(`Bedtime: ${bedtime}`);
    Logger.info(
      `Time Asleep: ${timeAsleep} (${outputMomentDuration(timeAsleepDuration)})`,
    );
    Logger.info(`Deep: ${deep} (${outputMomentDuration(deepDuration)})`);
    Logger.info(`REM: ${rem} (${outputMomentDuration(remDuration)})`);
  }

  const { earlyStart, earlyEnd, excelStart, excelEnd, fairStart, fairEnd } =
    getBedtimeRanges(date, bedtimeGoal);

  if (showLogs) {
    Logger.info("[ BEDTIME RANGES ]");
    Logger.info("Early (fair):");
    Logger.info(outputMoment(earlyStart));
    Logger.info(outputMoment(earlyEnd));
    Logger.info("Excellent:");
    Logger.info(outputMoment(excelStart));
    Logger.info(outputMoment(excelEnd));
    Logger.info("Fair:");
    Logger.info(outputMoment(fairStart));
    Logger.info(outputMoment(fairEnd));
  }

  const {
    excelDeepThreshold,
    excelRemThreshold,
    fairDeepThreshold,
    fairRemThreshold,
    badStageThreshold,
  } = getStageThresholds(
    timeAsleepExcelThresholdDuration,
    timeAsleepFairThresholdDuration,
    deepGoal,
    remGoal,
  );

  if (showLogs) {
    Logger.info("[ STAGE THRESHOLDS ]");
    Logger.info("Excellent deep:");
    Logger.info(outputMomentDuration(excelDeepThreshold));
    Logger.info("Excellent REM:");
    Logger.info(outputMomentDuration(excelRemThreshold));
    Logger.info("Fair deep:");
    Logger.info(outputMomentDuration(fairDeepThreshold));
    Logger.info("Fair REM:");
    Logger.info(outputMomentDuration(fairRemThreshold));
  }

  // Handle case where sleep did not occur
  if (
    date &&
    bedtimeGoal === "" &&
    timeAsleepExcelThreshold === "" &&
    timeAsleepFairThreshold === "" &&
    timeAsleepFairThreshold === "" &&
    deepGoal === "" &&
    remGoal === "" &&
    bedtime === "" &&
    timeAsleep === "" &&
    deep === "" &&
    rem === ""
  ) {
    return 0;
  }

  /* Grading T (Bedtime Grade) */
  if (showLogs) {
    Logger.info("[ GRADING T ]");
  }

  const bt = createMoment(date, bedtime);
  let T = 0;

  if (bt.isBetween(earlyStart, earlyEnd, undefined, [])) {
    if (showLogs) {
      Logger.info("Fair bedtime: +90");
    }
    T = 90;
  } else if (bt.isBetween(excelStart, excelEnd, undefined, [])) {
    if (showLogs) {
      Logger.info("Excellent bedtime: +100");
    }
    T = 100;
  } else if (bt.isBetween(fairStart, fairEnd, undefined, [])) {
    if (showLogs) {
      Logger.info("Fair bedtime: +90");
    }
    T = 90;
  } else {
    if (showLogs) {
      Logger.info("Bad bedtime: +50");
    }
    T = 50;
  }

  if (showLogs) {
    Logger.info(`T = ${T}`);
  }

  /* Grading D (Time Asleep Grade) */
  if (showLogs) {
    Logger.info("[ GRADING D ]");
  }

  let D = 0;

  if (timeAsleepDuration >= timeAsleepExcelThresholdDuration) {
    if (showLogs) {
      Logger.info("Excellent time asleep: +100");
    }
    D = 100;
  } else if (timeAsleepDuration >= timeAsleepFairThresholdDuration) {
    if (showLogs) {
      Logger.info("Fair time asleep: +70");
    }
    D = 70;
  } else if (timeAsleepDuration >= timeAsleepPoorThresholdDuration) {
    if (showLogs) {
      Logger.info("Poor time asleep: +60");
    }
    D = 60;
  } else {
    if (showLogs) {
      Logger.info("Bad time asleep: +50");
    }
    D = 50;
  }

  if (showLogs) {
    Logger.info(`D = ${D}`);
  }

  /* Grading Q (Quality of Sleep Grade) */
  if (showLogs) {
    Logger.info("[ GRADING Q ]");
  }

  let Q = 0;

  let d = 0;

  if (moment.isDuration(deepDuration) && deepDuration >= excelDeepThreshold) {
    if (showLogs) {
      Logger.info("Excellent deep sleep: +50");
    }
    d += 50;
  } else if (
    moment.isDuration(deepDuration) &&
    deepDuration >= fairDeepThreshold
  ) {
    if (showLogs) {
      Logger.info("Fair deep sleep: +40");
    }
    d += 40;
  } else if (
    moment.isDuration(deepDuration) &&
    deepDuration >= badStageThreshold
  ) {
    if (showLogs) {
      Logger.info("Bad deep sleep: +10");
    }
    d += 10;
  } else {
    if (showLogs) {
      Logger.info("Fail deep sleep: +0");
    }
  }

  let r = 0;

  if (moment.isDuration(remDuration) && remDuration >= excelRemThreshold) {
    if (showLogs) {
      Logger.info("Excellent REM sleep: +50");
    }
    r += 50;
  } else if (
    moment.isDuration(remDuration) &&
    remDuration >= fairRemThreshold
  ) {
    if (showLogs) {
      Logger.info("Fair REM sleep: +40");
    }
    r += 40;
  } else if (
    moment.isDuration(remDuration) &&
    remDuration >= badStageThreshold
  ) {
    if (showLogs) {
      Logger.info("Bad REM sleep: +10");
    }
    r += 10;
  } else {
    if (showLogs) {
      Logger.info("Fail REM sleep: +0");
    }
  }

  Q = d + r;

  if (showLogs) {
    Logger.info(`${d} + ${r}`);
    Logger.info(`Q = ${Q}`);
  }

  /* Calculating S (Sleep Score) */
  if (showLogs) {
    Logger.info("[ CALCULATING S ]");
  }

  const S = (T * 0.6 + D * 0.4) * 0.8 + Q * 0.2;

  if (showLogs) {
    Logger.info(`(${T} * 0.6 + ${D} * 0.4) * 0.8 + ${Q} * 0.2`);
    Logger.info(`S = ${S}`);
  }

  return Math.ceil(S);
};

/**
 * Calculate the sleep scores for multiple sleep sessions at once.
 *
 * @param {Array.<Date>} dates An array of dates for sessions
 * @param {Array.<Date>} bedtimeGoal An array of bedtime goals
 * @param {Array.<Date>} timeAsleepExcelThresholds An array of thresholds for excellent time asleep
 * @param {Array.<Date>} timeAsleepFairThresholds An array of thresholds for fair time asleep
 * @param {Array.<Date>} timeAsleepPoorThresholds An array of thresholds for poor time asleep
 * @param {Array.<number>} deepGoals An array of deep sleep percentage goals
 * @param {Array.<number>} remGoals An array of REM sleep percentage goals
 * @param {Array.<Date>} bedtimes An array of bedtime metrics
 * @param {Array.<Date>} timesAsleep An array of time asleep metrics
 * @param {Array.<Date>} deeps An array of deep sleep metrics
 * @param {Array.<Date>} rems An array of REM sleep metrics
 * @param {boolean=} showLogs Flag that will show logs in console when set to true
 * @returns {Array.<number>} An array of sleep scores
 */
export const calculateAll = (
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
  showLogs,
) => {
  // Throw error when parameter arrays do not match in size
  if (
    dates.length !== bedtimes.length ||
    dates.length !== timeAsleepExcelThresholds.length ||
    dates.length !== timeAsleepFairThresholds.length ||
    dates.length !== timeAsleepPoorThresholds.length ||
    dates.length !== deepGoals.length ||
    dates.length !== remGoals.length ||
    dates.length !== bedtimes.length ||
    dates.length !== timesAsleep.length ||
    dates.length !== deeps.length ||
    dates.length !== rems.length
  ) {
    throw new Error("Parameter arrays do not match in size.");
  }

  if (showLogs) {
    Logger.info(`Calculating ${dates.length} scores...`);
  }

  const scores = [];

  dates.forEach((_, i) => {
    scores.push(
      calculate(
        dates[i],
        bedtimeGoals[i],
        timeAsleepExcelThresholds[i],
        timeAsleepFairThresholds[i],
        timeAsleepPoorThresholds[i],
        deepGoals[i],
        remGoals[i],
        bedtimes[i],
        timesAsleep[i],
        deeps[i],
        rems[i],
        showLogs,
      ),
    );
  });

  return scores;
};
