function debug() {
  const sheetNameParams = "2025 Params";
  const sheetNameResults = "2025";
  const rowNum = "11";

  Logger.info(
    `Executing debug script for row ${rowNum} in ${sheetNameResults}...`,
  );

  const {
    dates,
    bedtimeGoals,
    timeAsleepExcelThresholds,
    timeAsleepFairThresholds,
    timeAsleepPoorThresholds,
    deepGoals,
    remGoals,
    bedtimes,
    timesAsleep,
    deeps,
    rems,
  } = extractData(
    sheetNameParams,
    `A${rowNum}`,
    `B${rowNum}`,
    `C${rowNum}`,
    `D${rowNum}`,
    `E${rowNum}`,
    `F${rowNum}`,
    `G${rowNum}`,
    sheetNameResults,
    `B${rowNum}`,
    `C${rowNum}`,
    `E${rowNum}`,
    `F${rowNum}`,
  );

  const scores = calculateAll(
    dates,
    bedtimeGoals,
    timeAsleepExcelThresholds,
    timeAsleepFairThresholds,
    timeAsleepPoorThresholds,
    deepGoals,
    remGoals,
    bedtimes,
    timesAsleep,
    deeps,
    rems,
    true,
  );

  Logger.info("[ DEBUGGING ] ");
  Logger.info(scores);
}
