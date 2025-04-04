import moment from "moment";

import { createMoment } from "./util";

/**
 * Get the bedtime ranges based off the bedtime goal.
 * Note that when this is run on a day where daylight savings begins, an additional
 * hour can be potentially added to some windows.
 *
 * @param {Date} date Sleep session date
 * @param {Date} bedtimeGoal Bedtime goal
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
 * Get the deep and REM thresholds for excellent, fair, and bad sleep.
 *
 * @param {moment.Duration} timeAsleepExcelThresholdDuration Moment.js duration threshold for excellent time asleep
 * @param {moment.Duration} timeAsleepFairThresholdDuration Moment.js duration threshold for fair time asleep
 * @param {moment.Duration} deepGoal Deep sleep percentage goal
 * @param {moment.Duration} remGoal REM sleep percentage goal
 * @returns {Object.<string, moment.Duration>} An object that contains the deep and REM thresholds for excellent, fair, and bad sleep
 */
export const getStageThresholds = (
  timeAsleepExcelThresholdDuration,
  timeAsleepFairThresholdDuration,
  deepGoal,
  remGoal,
) => {
  const stageThresholds = {};

  stageThresholds.excelDeepThreshold = moment.duration({
    minutes: Math.floor(
      timeAsleepExcelThresholdDuration.asMinutes() * (deepGoal * 0.01),
    ),
  });

  stageThresholds.excelRemThreshold = moment.duration({
    minutes: Math.floor(
      timeAsleepExcelThresholdDuration.asMinutes() * (remGoal * 0.01),
    ),
  });

  stageThresholds.fairDeepThreshold = moment.duration({
    minutes: Math.floor(
      timeAsleepFairThresholdDuration.asMinutes() * (deepGoal * 0.01),
    ),
  });

  stageThresholds.fairRemThreshold = moment.duration({
    minutes: Math.floor(
      timeAsleepFairThresholdDuration.asMinutes() * (remGoal * 0.01),
    ),
  });

  stageThresholds.badStageThreshold = moment.duration({ minutes: 1 });

  return stageThresholds;
};
