function main2024() {
  Logger.info("Executing script for 2024...");

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
    "2024 Params",
    "A2:A10",
    "B2:B10",
    "C2:C10",
    "D2:D10",
    "E2:E10",
    "F2:F10",
    "G2:G10",
    "2024",
    "B2:B10",
    "C2:C10",
    "E2:E10",
    "F2:F10",
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

  Logger.info("[ 2024 SCORES ] ");
  Logger.info(scores);
  writeScores("2024", "I2:I10", scores);
}
