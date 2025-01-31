/* global Logger */
import { getBedtimeRanges, getStageThresholds } from "./params";
import {
  convertGsheetsDurationToMomentDuration,
  createMoment,
  outputMoment,
  outputMomentDuration,
} from "./util";

/**
 * Calculate a sleep score.
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

  if (!deep) {
    throw new Error("Deep sleep was not found.");
  }

  if (!rem) {
    throw new Error("REM sleep was not found.");
  }

  const timeAsleepDuration = convertGsheetsDurationToMomentDuration(timeAsleep);
  const timeAsleepExcelThresholdDuration =
    convertGsheetsDurationToMomentDuration(timeAsleepExcelThreshold);
  const timeAsleepFairThresholdDuration =
    convertGsheetsDurationToMomentDuration(timeAsleepFairThreshold);
  const timeAsleepPoorThresholdDuration =
    convertGsheetsDurationToMomentDuration(timeAsleepPoorThreshold);
  const deepDuration = convertGsheetsDurationToMomentDuration(deep);
  const remDuration = convertGsheetsDurationToMomentDuration(rem);

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

  if (deepDuration >= excelDeepThreshold) {
    if (showLogs) {
      Logger.info("Excellent deep sleep: +50");
    }
    d += 50;
  } else if (deepDuration >= fairDeepThreshold) {
    if (showLogs) {
      Logger.info("Fair deep sleep: +40");
    }
    d += 40;
  } else {
    if (showLogs) {
      Logger.info("Bad deep sleep: +10");
    }
    d += 10;
  }

  let r = 0;

  if (remDuration >= excelRemThreshold) {
    if (showLogs) {
      Logger.info("Excellent REM sleep: +50");
    }
    r += 50;
  } else if (remDuration >= fairRemThreshold) {
    if (showLogs) {
      Logger.info("Fair REM sleep: +40");
    }
    r += 40;
  } else {
    if (showLogs) {
      Logger.info("Bad REM sleep: +10");
    }
    r += 10;
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
 * @param {Array.<Date>} dates An array of session dates
 * @param {Object.<string, moment.Moment>} bedtimeRanges An object that contains the start and end times for early, excellent, and fair bedtime ranges
 * @param {Object.<string, moment.Duration>} stageDurations An object that contains the target deep and REM stage durations for efficient and fair sleep
 * @param {Array.<Date>} bedtimes An array of bedtime metrics. Each item represents a metric for one session.
 * @param {Array.<Date>} timeAsleep An array of time asleep metrics. Each item represents a metric for one session.
 * @param {Array.<moment.Duration>} deep An array of deep sleep metrics. Each item represents a metric for one session.
 * @param {Array.<moment.Duration>} rem An array of REM sleep metrics. Each item represents a metric for one session.
 * @returns {Array.<number>} An array of sleep scores. Each item represents a score for a session.
 */
export const calculateAll = (
  dates,
  bedtimeRanges,
  stageDurations,
  bedtimes,
  timeAsleep,
  deep,
  rem,
) => {
  // First output a score of 0 for cases where sleep did not occur
  if (!dates && !bedtimes && !timeAsleep && !deep && !rem) {
    return 0;
  }

  if (
    dates.length == 0 &&
    bedtimes.length === 0 &&
    timeAsleep.length === 0 &&
    deep.length === 0 &&
    rem.length === 0
  ) {
    return 0;
  }

  // Handle error with input data format
  if (
    bedtimes.length !== dates.length ||
    bedtimes.length !== timeAsleep.length ||
    (bedtimes.length !== deep.length && bedtimes.length !== rem.length)
  ) {
    throw new Error(
      "Metric arrays do not match in size. Make sure all the data for metrics are the same size.",
    );
  }

  const { earlyStart, earlyEnd, excelStart, excelEnd, fairStart, fairEnd } =
    bedtimeRanges;

  const FORMAT = "HH:mm:ss";

  console.log(
    earlyStart.format(FORMAT),
    earlyEnd.format(FORMAT),
    excelStart.format(FORMAT),
    excelEnd.format(FORMAT),
    fairStart.format(FORMAT),
    fairEnd.format(FORMAT),
  );

  const { efficientDeep, efficientRem, fairDeepThreshold, fairRemThreshold } =
    stageDurations;

  console.log(
    efficientDeep.format(FORMAT),
    efficientRem.format(FORMAT),
    fairDeepThreshold.format(FORMAT),
    fairRemThreshold.format(FORMAT),
  );
  // if (!colB) {
  //   throw new Error("Column for bedtime was not set.");
  // }

  // Logger.info("colB");

  // const dataB = sheetResult.getRange(colB).getValues();
  // for (var i = 0; i < dataB.length; ++i) {
  //   Logger.log(dataB[i][0]);
  // }

  // if (!colA) {
  //   throw new Error("Column for time asleep was not set.");
  // }

  // Logger.info("colA");

  // const dataA = sheetResult.getRange(colA).getValues();
  // for (var i = 0; i < dataA.length; ++i) {
  //   Logger.log(dataA[i][0].toISOString());
  // }

  // if (!colDeep) {
  //   throw new Error("Column for deep sleep was not set.");
  // }

  // if (!colRem) {
  //   throw new Error("Column for REM sleep was not set.");
  // }

  // var sheetResult = SpreadsheetApp.getActiveSpreadsheet();

  // var data = sheetResult.getDataRange().getValues();

  // Logger.log(data[0][0]);
  // Logger.log(sheetResult.getRange("A1:A11").getValues());
  // // sheet.getRange('A1').setValue('monthya');

  // // var foo = sheet.getRange('A1:B2');
  // // Logger.log(foo.getValues());
  // // var bar = sheet.getActiveRange();
  // // Logger.log(bar);
};
