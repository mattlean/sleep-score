import moment from "moment";

/**
 * Get the bedtime ranges based off the bedtime goal.
 *
 * @param {Date} bedtimeGoal The excellent bedtime start time from Google Sheets in the form of a Date object
 * @returns {Object.<string, moment.Moment>} An object that contains the start and end times for early, excellent, and fair bedtime ranges
 */
export const getBedtimeRanges = (bedtimeGoal) => {
  const bedtimeRanges = {};

  bedtimeRanges.excellentStart = moment(new Date(bedtimeGoal));

  bedtimeRanges.excellentEnd = bedtimeRanges.excellentStart.clone();
  bedtimeRanges.excellentEnd.add({ hour: 2, minutes: 45 });

  bedtimeRanges.fairStart = bedtimeRanges.excellentEnd.clone();
  bedtimeRanges.fairStart.add({ minutes: 1 });

  bedtimeRanges.fairEnd = bedtimeRanges.fairStart.clone();
  bedtimeRanges.fairEnd.add({ minutes: 44 });

  bedtimeRanges.earlyStart = bedtimeRanges.excellentStart.clone();
  bedtimeRanges.earlyStart.subtract({ minutes: 30 });

  bedtimeRanges.earlyEnd = bedtimeRanges.earlyStart.clone();
  bedtimeRanges.earlyEnd.add({ minutes: 29 });

  return bedtimeRanges;
};

/**
 * Get the target durations for deep and REM stages for efficient and fair sleep.
 *
 * @param {Object} arg Object that contains the target percentages for deep and REM stages and the durations for efficient and fair time asleep
 * @param {number} arg.deepPercent The target percentage for deep sleep
 * @param {number} arg.remPercent The target percentage for REM sleep
 * @param {number} arg.efficientTimeAsleepMin The duration of efficient time asleep in minutes
 * @param {number} arg.fairTimeAsleepMin The duration of fair time asleep in minutes
 * @returns {Object.<string, moment.Duration>} An object that contains the target deep and REM stage durations for efficient and fair sleep
 */
export const getStageDurations = ({
  deepPercent,
  remPercent,
  efficientTimeAsleepMin,
  fairTimeAsleepMin,
}) => {
  const stageDurations = {};

  stageDurations.efficientDeep = moment.duration({
    minutes: efficientTimeAsleepMin * (deepPercent * 0.01),
  });

  stageDurations.efficientRem = moment.duration({
    minutes: efficientTimeAsleepMin * (remPercent * 0.01),
  });

  stageDurations.fairDeep = moment.duration({
    minutes: fairTimeAsleepMin * (deepPercent * 0.01),
  });

  stageDurations.fairRem = moment.duration({
    minutes: fairTimeAsleepMin * (remPercent * 0.01),
  });

  return stageDurations;
};
