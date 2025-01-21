import moment from "moment";

/**
 * Determine the bedtime ranges based off the the optimal bedtime range start.
 *
 * @param {Date} bedtimeStart The bedtime start time from Google Sheets in the form of a Date object
 * @returns {Object.<string, moment.Moment>} An object that contains the start and end times for optimal and fair bedtime ranges
 */
export const setBedtimeRanges = (bedtimeStart) => {
  const optimalStart = moment(new Date(bedtimeStart));
  const optimalEnd = optimalStart.clone();
  optimalEnd.add({ hour: 2, minutes: 45 });

  const fairStart = optimalEnd.clone();
  fairStart.add({ minutes: 1 });
  const fairEnd = fairStart.clone();
  fairEnd.add({ minutes: 44 });

  return {
    optimalStart,
    optimalEnd,
    fairStart,
    fairEnd,
  };
};

/**
 * Determine the target durations for deep and REM stages for optimal and fair sleep.
 *
 * @param {Object} arg Object that contains the target percentages for deep and REM stages and the durations for optimal and fair time asleep
 * @param {number} arg.deepPercent The target percentage for deep sleep
 * @param {number} arg.remPercent The target percentage for REM sleep
 * @param {number} arg.optimalTimeAsleepMin The duration of optimal time asleep in minutes
 * @param {number} arg.fairTimeAsleepMin The duration of fair time asleep in minutes
 * @returns {Object.<string, moment.Duration>} An object that contains the target deep and REM stage durations for optimal and fair sleep
 */
export const setStageRanges = ({
  deepPercent,
  remPercent,
  optimalTimeAsleepMin,
  fairTimeAsleepMin,
}) => {
  const result = {};

  result.optimalDeep = moment.duration({
    minutes: optimalTimeAsleepMin * (deepPercent * 0.01),
  });
  result.optimalRem = moment.duration({
    minutes: optimalTimeAsleepMin * (remPercent * 0.01),
  });
  result.fairDeep = moment.duration({
    minutes: fairTimeAsleepMin * (deepPercent * 0.01),
  });
  result.fairRem = moment.duration({
    minutes: fairTimeAsleepMin * (remPercent * 0.01),
  });

  return result;
};
