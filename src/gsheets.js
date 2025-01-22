/* global SpreadsheetApp */

/**
 * Extract data from the Google Sheets spreadsheet.
 *
 * @param {string} sheetNameResult The name of the sheet that contains the results
 * @param {string} sheetNameParams The name of the sheet that contains the parameters for the sleep score algorithm
 * @param {string} colBedtime A range for the bedtime column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colTimeAsleep A range for the time asleep column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colDeep A range for the deep column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colRem A range for the REM column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @returns {Object.<string, Date>} An object that contains the spreadsheet data
 */
export const extractData = (
  sheetNameResult,
  sheetNameParams,
  colBedtime,
  colTimeAsleep,
  colDeep,
  colRem,
) => {
  if (!sheetNameResult) {
    throw new Error("Name for the result sheet was not set.");
  }

  if (!sheetNameParams) {
    throw new Error("Name for the params sheet was not set.");
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

  data.bedtimes = sheetResult.getRange(colBedtime).getValues().flat();
  data.timeAsleep = sheetResult.getRange(colTimeAsleep).getValues().flat();
  data.deep = sheetResult.getRange(colDeep).getValues().flat();
  data.rem = sheetResult.getRange(colRem).getValues().flat();

  return data;
};

/**
 * Write scores into the Google Sheets spreadsheet.
 *
 * @param {string} sheetNameResult The name of the sheet that contains the results
 * @param {string} colScore A range for the score column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {Array.<number>} scores An array of scores to write into the score column
 */
export const writeScores = (sheetNameResult, colScore, scores) => {
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
