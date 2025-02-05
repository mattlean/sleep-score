function main2025() {
  Logger.info("Executing script for 2025...");

  const endRow = "5";

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
    "2025 Params",
    `A2:A${endRow}`,
    `B2:B${endRow}`,
    `C2:C${endRow}`,
    `D2:D${endRow}`,
    `E2:E${endRow}`,
    `F2:F${endRow}`,
    `G2:G${endRow}`,
    "2025",
    `B2:B${endRow}`,
    `C2:C${endRow}`,
    `E2:E${endRow}`,
    `F2:F${endRow}`,
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
  );

  Logger.info("[ 2025 SCORES ] ");
  Logger.info(scores);
  writeScores("2025", `I2:I${endRow}`, scores);
}
