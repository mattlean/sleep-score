import moment from "moment";

import { createMoment } from "./util";

/**
 * Get the bedtime ranges based off the bedtime goal.
 *
 * @param {Date} date The sleep session date
 * @param {Date} bedtimeGoal The bedtime goal on the corresponding date
 * @returns {Object.<string, moment.Moment>} An object that contains the start and end times for early, excellent, and fair bedtime ranges
 */
export const getBedtimeRanges = (date, bedtimeGoal) => {
  const bedtimeRanges = {};

  bedtimeRanges.excelStart = createMoment(date, bedtimeGoal);

  bedtimeRanges.earlyStart = bedtimeRanges.excelStart.clone();
  bedtimeRanges.earlyStart.subtract({ minutes: 30 });

  bedtimeRanges.earlyEnd = bedtimeRanges.earlyStart.clone();
  bedtimeRanges.earlyEnd.add({ minutes: 29 });

  bedtimeRanges.excelEnd = bedtimeRanges.excelStart.clone();
  bedtimeRanges.excelEnd.add({ hour: 2, minutes: 45 });

  bedtimeRanges.fairStart = bedtimeRanges.excelEnd.clone();
  bedtimeRanges.fairStart.add({ minutes: 1 });

  bedtimeRanges.fairEnd = bedtimeRanges.fairStart.clone();
  bedtimeRanges.fairEnd.add({ minutes: 44 });

  return bedtimeRanges;
};

/**
 * Get the deep and REM thresholds for excellent and fair sleep.
 *
 * @param {moment.Duration} timeAsleepExcelGoalDuration The minimum threshold for excellent time asleep
 * @param {moment.Duration} timeAsleepFairGoalDuration The minimum threshold for fair time asleep
 * @param {moment.Duration} deepPercent The deep sleep percentage goal
 * @param {moment.Duration} remPercent The REM sleep percentage goal
 * @returns {Object.<string, moment.Duration>} An object that contains the deep and REM thresholds for excellent and fair sleep
 */
export const getStageThresholds = (
  timeAsleepExcelGoalDuration,
  timeAsleepFairGoalDuration,
  deepPercent,
  remPercent,
) => {
  const stageThresholds = {};

  stageThresholds.excelDeep = moment.duration({
    minutes: timeAsleepExcelGoalDuration.asMinutes() * (deepPercent * 0.01),
  });

  stageThresholds.excelRem = moment.duration({
    minutes: timeAsleepExcelGoalDuration.asMinutes() * (remPercent * 0.01),
  });

  stageThresholds.fairDeep = moment.duration({
    minutes: timeAsleepFairGoalDuration.asMinutes() * (deepPercent * 0.01),
  });

  stageThresholds.fairRem = moment.duration({
    minutes: timeAsleepFairGoalDuration.asMinutes() * (remPercent * 0.01),
  });

  return stageThresholds;
};
