function main() {
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
    "params",
    "A2:A11",
    "B2:B11",
    "C2:C11",
    "D2:D11",
    "E2:E11",
    "F2:F11",
    "G2:G11",
    "results",
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

  writeScores("results", "I2:I11", scores);
}
