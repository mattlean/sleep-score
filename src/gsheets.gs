/**
 * Extract data from a Google Sheets spreadsheet.
 *
 * @param {string} sheetNameParams Name of the sheet that contains the parameters for the sleep score algorithm
 * @param {string} colDate Range for the date column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colBedtimeGoal Range for the bedtime goal column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colTimeAsleepExcelThreshold Range for the time asleep excellent threshold column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colTimeAsleepFairThreshold Range for the time asleep fair threshold column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colTimeAsleepPoorThreshold Range for the time asleep poor threshold column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colDeepGoal Range for the deep sleep percentage goal column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colRemGoal Range for the REM sleep percentage goal column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} sheetNameResults The name of the sheet that contains the results
 * @param {string} colBedtime Range for the bedtime column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colTimeAsleep Range for the time asleep column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colDeep Range for the deep column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {string} colRem Range for the REM column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @returns {Object.<string, Date|number>} An object that contains the spreadsheet data
 */
const extractData = (
  sheetNameParams,
  colDate,
  colBedtimeGoal,
  colTimeAsleepExcelThreshold,
  colTimeAsleepFairThreshold,
  colTimeAsleepPoorThreshold,
  colDeepGoal,
  colRemGoal,
  sheetNameResults,
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

  if (!colTimeAsleepExcelThreshold) {
    throw new Error("Column for time asleep excellent minimum was not set.");
  }

  if (!colTimeAsleepFairThreshold) {
    throw new Error("Column for time asleep fair minimum was not set.");
  }

  if (!colTimeAsleepPoorThreshold) {
    throw new Error("Column for time asleep poor minimum was not set.");
  }

  if (!colDeepGoal) {
    throw new Error("Column for deep sleep goal percentage was not set.");
  }

  if (!colRemGoal) {
    throw new Error("Column for REM sleep goal percentage was not set.");
  }

  if (!sheetNameResults) {
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

  const sheetResults =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNameResults);
  if (sheetResults === null) {
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
  data.timeAsleepExcelThresholds = sheetParams
    .getRange(colTimeAsleepExcelThreshold)
    .getValues()
    .flat();
  data.timeAsleepFairThresholds = sheetParams
    .getRange(colTimeAsleepFairThreshold)
    .getValues()
    .flat();
  data.timeAsleepPoorThresholds = sheetParams
    .getRange(colTimeAsleepPoorThreshold)
    .getValues()
    .flat();
  data.deepGoals = sheetParams.getRange(colDeepGoal).getValues().flat();
  data.remGoals = sheetParams.getRange(colRemGoal).getValues().flat();
  data.bedtimes = sheetResults.getRange(colBedtime).getValues().flat();
  data.timesAsleep = sheetResults.getRange(colTimeAsleep).getValues().flat();
  data.deeps = sheetResults.getRange(colDeep).getValues().flat();
  data.rems = sheetResults.getRange(colRem).getValues().flat();

  return data;
};

/**
 * Write scores into a Google Sheets spreadsheet.
 *
 * @param {string} sheetNameResults Name of the sheet that contains the results
 * @param {string} colScore Range for the score column as specified in A1 notation or R1C1 notation (https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet#getrangea1notation)
 * @param {Array.<number>} scores Scores to write into the score column
 */
const writeScores = (sheetNameResults, colScore, scores) => {
  if (!sheetNameResults) {
    throw new Error("Name for the result sheet was not set.");
  }

  const sheetResults =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetNameResults);
  if (sheetResults === null) {
    throw new Error("Result sheet was not found.");
  }

  // Convert scores array into format that is accepted by setValues:
  // https://developers.google.com/apps-script/reference/spreadsheet/range#setvaluesvalues
  const values = scores.reduce((accumulator, currVal) => {
    accumulator.push([currVal]);
    return accumulator;
  }, []);

  sheetResults.getRange(colScore).setValues(values);
};
