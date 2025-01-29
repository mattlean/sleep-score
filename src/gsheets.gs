/* global SpreadsheetApp */

/**
 * Extract data from a Google Sheets spreadsheet.
 *
 * @param {string} sheetNameParams The name of the sheet that contains the parameters for the sleep score algorithm
 * @param {string} colDate A range for the date column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colBedtimeGoal A range for the bedtime goal column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colTimeAsleepExcelGoal A range for the time asleep excellent goal column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colTimeAsleepFairGoal A range for the time asleep fair goal column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colTimeAsleepPoorGoal A range for the time asleep poor goal column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colDeepGoal A range for the deep sleep percentage goal column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colRemGoal A range for the REM sleep percentage goal column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} sheetNameResult The name of the sheet that contains the results
 * @param {string} colBedtime A range for the bedtime column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colTimeAsleep A range for the time asleep column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colDeep A range for the deep column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colRem A range for the REM column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @returns {Object.<string, Date|number>} An object that contains the spreadsheet data
 */
const extractData = (
  sheetNameParams,
  colDate,
  colBedtimeGoal,
  colTimeAsleepExcelGoal,
  colTimeAsleepFairGoal,
  colTimeAsleepPoorGoal,
  colDeepGoal,
  colRemGoal,
  sheetNameResult,
  colBedtime,
  colTimeAsleep,
  colDeep,
  colRem,
) => {
  if (!sheetNameParams) {
    throw new Error("Name for the params sheet was not set.");
  }

  if (!colDate) {
    throw new Error("Column for date was not set.");
  }

  if (!colBedtimeGoal) {
    throw new Error("Column for bedtime goal was not set.");
  }

  if (!colTimeAsleepExcelGoal) {
    throw new Error("Column for time asleep excellent minimum was not set.");
  }

  if (!colTimeAsleepFairGoal) {
    throw new Error("Column for time asleep fair minimum was not set.");
  }

  if (!colTimeAsleepPoorGoal) {
    throw new Error("Column for time asleep poor minimum was not set.");
  }

  if (!colDeepGoal) {
    throw new Error("Column for deep sleep goal percentage was not set.");
  }

  if (!colRemGoal) {
    throw new Error("Column for REM sleep goal percentage was not set.");
  }

  if (!sheetNameResult) {
    throw new Error("Name for the result sheet was not set.");
  }

  if (!colBedtime) {
    throw new Error("Column for bedtime was not set.");
  }

  if (!colTimeAsleep) {
    throw new Error("Column for time asleep was not set.");
  }

  if (!colDeep) {
    throw new Error("Column for deep stage was not set.");
  }

  if (!colRem) {
    throw new Error("Column for REM stage was not set.");
  }

  const sheetResult =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNameResult);
  if (sheetResult === null) {
    throw new Error("Result sheet was not found.");
  }

  const sheetParams =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNameParams);
  if (sheetParams === null) {
    throw new Error("Params sheet was not found.");
  }

  const data = {};

  data.dates = sheetParams.getRange(colDate).getValues().flat();
  data.bedtimeGoals = sheetParams.getRange(colBedtimeGoal).getValues().flat();
  data.timeAsleepExcelGoals = sheetParams
    .getRange(colTimeAsleepExcelGoal)
    .getValues()
    .flat();
  data.timeAsleepFairGoals = sheetParams
    .getRange(colTimeAsleepFairGoal)
    .getValues()
    .flat();
  data.timeAsleepPoorGoals = sheetParams
    .getRange(colTimeAsleepPoorGoal)
    .getValues()
    .flat();
  data.deepGoals = sheetParams.getRange(colDeepGoal).getValues().flat();
  data.remGoals = sheetParams.getRange(colRemGoal).getValues().flat();
  data.bedtimes = sheetResult.getRange(colBedtime).getValues().flat();
  data.timesAsleep = sheetResult.getRange(colTimeAsleep).getValues().flat();
  data.deeps = sheetResult.getRange(colDeep).getValues().flat();
  data.rems = sheetResult.getRange(colRem).getValues().flat();

  return data;
};

// /**
//  * Mutate data extracted from a Google Sheets spreadsheet to make it compatible with the calculate function.
//  *
//  * @param {Object.<string, number|string>} data An object that contains the spreadsheet data
//  */
// const setupData = (data) => {
//   const KEYS = [
//     "dates",
//     "bedtimeGoals",
//     "bedtimes",
//     "timesAsleep",
//     "deeps",
//     "rems",
//   ];

//   KEYS.forEach((key) => {
//     data[key].forEach((val, i) => {
//       data[key][i] = new Date(val);
//     });
//   });
// };

/**
 * Write scores into a Google Sheets spreadsheet.
 *
 * @param {string} sheetNameResult The name of the sheet that contains the results
 * @param {string} colScore A range for the score column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {Array.<number>} scores An array of scores to write into the score column
 */
const writeScores = (sheetNameResult, colScore, scores) => {
  if (!sheetNameResult) {
    throw new Error("Name for the result sheet was not set.");
  }

  const sheetResult =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNameResult);
  if (sheetResult === null) {
    throw new Error("Result sheet was not found.");
  }

  // Convert scores array into format that is accepted by setValues:
  // https://developers.google.com/apps-script/reference/spreadsheet/range#setvaluesvalues
  const values = scores.reduce((accumulator, currVal) => {
    accumulator.push([currVal]);
    return accumulator;
  }, []);

  sheetResult.getRange(colScore).setValues(values);
};
