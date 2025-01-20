import moment from "moment";

/**
 * Google Sheets converts durations into JavaScript Date objects in Apps Script, so
 * this function converts it into a Moment.js duration.
 *
 * One limitation is that because the duration is converted into a Date object, any
 * amount of hours that exceeds 23 is lost.
 *
 * For more information:
 * https://webapps.stackexchange.com/questions/137061/working-with-durations-in-google-apps-script
 *
 * Another limitation is that Google Sheets does not include the milliseconds portion
 * of time in the Date object.
 *
 * @param {Date} date Google Sheets duration in the form of a Date object
 * @returns {moment.Duration} A Moment.js duration
 */
export const convertGsheetsDurationToMoment = (gsheetsDuration) =>
  moment.duration({
    hours: gsheetsDuration.getHours(),
    minutes: gsheetsDuration.getMinutes(),
    seconds: gsheetsDuration.getSeconds(),
  });

/**
 * Output Moment.js duration as a string in the Google Sheets duration format
 * @param {moment.Duration} momentDuration A Moment.js duration
 * @returns {string} A string in the Google Sheets duration format
 */
export const displayMomentDuration = (momentDuration) => {
  const hours = momentDuration.hours().toString().padStart(2, "0");
  const minutes = momentDuration.minutes().toString().padStart(2, "0");
  const seconds = momentDuration.seconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};
