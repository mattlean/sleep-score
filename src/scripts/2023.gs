function main() {
  Logger.info("Executing script for 2023...");

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
    "2023 Params",
    "A2:A11",
    "B2:B11",
    "C2:C11",
    "D2:D11",
    "E2:E11",
    "F2:F11",
    "G2:G11",
    "2023",
    "B2:B11",
    "C2:C11",
    "E2:E11",
    "F2:F11",
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

  Logger.info("[ SCORES ] ");
  Logger.info(scores);
  writeScores("2023", "I2:I11", scores);
}
