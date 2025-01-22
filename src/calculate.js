/* global Logger */

/**
 * Calculate the sleep score.
 *
 * @param {Array.<Date>} bedtimes
 * @param {Array.<Date>} timeAsleep
 * @param {Array.<moment.Duration>} deep
 * @param {Array.<moment.Duration>} rem
 * @returns
 */
export const calculate = (bedtimes, timeAsleep, deep, rem) => {
  // First output a score of 0 for cases where sleep did not occur
  if (!bedtimes && !timeAsleep && !deep && !rem) {
    return 0;
  }

  if (
    bedtimes.length === 0 &&
    timeAsleep.length === 0 &&
    deep.length === 0 &&
    rem.length === 0
  ) {
    return 0;
  }

  if (
    bedtimes.length !== timeAsleep.length ||
    (bedtimes.length !== deep.length && bedtimes.length !== rem.length)
  ) {
    throw new Error(
      "Data parameters do not match in size. Make sure all the data passed into the parameters are the same size.",
    );
  }

  for (let i = 0; i < bedtimes.length; ++i) {
    Logger.log(bedtimes[0]);
  }

  if (!colB) {
    throw new Error("Column for bedtime was not set.");
  }

  Logger.info("colB");

  const dataB = sheetResult.getRange(colB).getValues();
  for (var i = 0; i < dataB.length; ++i) {
    Logger.log(dataB[i][0]);
  }

  if (!colA) {
    throw new Error("Column for time asleep was not set.");
  }

  Logger.info("colA");

  const dataA = sheetResult.getRange(colA).getValues();
  for (var i = 0; i < dataA.length; ++i) {
    Logger.log(dataA[i][0].toISOString());
  }

  if (!colDeep) {
    throw new Error("Column for deep sleep was not set.");
  }

  if (!colRem) {
    throw new Error("Column for REM sleep was not set.");
  }

  var sheetResult = SpreadsheetApp.getActiveSpreadsheet();

  var data = sheetResult.getDataRange().getValues();

  Logger.log(data[0][0]);
  Logger.log(sheetResult.getRange("A1:A11").getValues());
  // sheet.getRange('A1').setValue('monthya');

  // var foo = sheet.getRange('A1:B2');
  // Logger.log(foo.getValues());
  // var bar = sheet.getActiveRange();
  // Logger.log(bar);
};
