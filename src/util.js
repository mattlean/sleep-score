import moment from "moment";

/**
 * Google Sheets converts durations into JavaScript Date objects in Apps Script, so
 * this function converts it into a Moment.js duration.
 *
 * One limitation is that because the duration is converted into a Date object, any
 * amount of hours that exceeds 23 is lost.
 *
 * For more info:
 * https://webapps.stackexchange.com/questions/137061/working-with-durations-in-google-apps-script
 *
 * Another limitation is that Google Sheets does not include the milliseconds portion
 * of time in the Date object.
 *
 * @param {Date} date Google Sheets duration in the form of a Date object
 * @returns {moment.Duration} A Moment.js duration
 */
export const convertGsheetsDurationToMomentDuration = (gsheetsDuration) =>
  moment.duration({
    hours: gsheetsDuration.getHours(),
    minutes: gsheetsDuration.getMinutes(),
    seconds: gsheetsDuration.getSeconds(),
  });

/**
 * Convert an array of Google Sheets durations into the form of JavaScript Date objects
 * to an array of Moment.js durations.
 *
 * @param {Array.<Date>} gsheetDurations An array of Dates representing sleep stage durations
 * @returns {Array.<moment.Duration>} An array of Moment.js durations representing sleep stage durations
 */
export const convertGsheetsDurationsToMomentDurations = (gsheetDurations) =>
  gsheetDurations.map((date) => convertGsheetsDurationToMomentDuration(date));

/**
 * Create a moment using a date and a generic time that exist on two different Date objects.
 *
 * @param {Date} date Date the moment should be on
 * @param {Date} time Time the moment should be on
 * @returns {moment.Moment} A moment for the date and time
 */
export const createMoment = (date, time) => {
  return moment({
    month: date.getMonth(),
    day: date.getDate(),
    year: date.getFullYear(),
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
  });
};

/**
 * Output moment as a string in this format: MM/DD/YY - HH:mm:ss
 *
 * For more info: https://momentjs.com/docs/#/displaying/format/
 *
 * @param {moment.Moment} momentDatetime A moment
 * @returns {string} A string that displays the datetime in an easier to read way
 */
export const outputMoment = (momentDatetime) => {
  return momentDatetime.format("MM/DD/YY - HH:mm:ss");
};

/**
 * Output Moment.js duration as a string in the Google Sheets duration format
 *
 * @param {moment.Duration} momentDuration A Moment.js duration
 * @returns {string} A string in the Google Sheets duration format
 */
export const outputMomentDuration = (momentDuration) => {
  const hours = momentDuration.hours().toString().padStart(2, "0");
  const minutes = momentDuration.minutes().toString().padStart(2, "0");
  const seconds = momentDuration.seconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
