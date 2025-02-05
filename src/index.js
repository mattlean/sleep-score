/* global Logger */
import "./Logger";
import { SESSION_README } from "./MOCK_DATA";
import { calculate } from "./calculate";

const {
  date,
  bedtimeGoal,
  timeAsleepExcelThreshold,
  timeAsleepFairThreshold,
  timeAsleepPoorThreshold,
  deepGoal,
  remGoal,
  bedtime,
  timeAsleep,
  deep,
  rem,
} = SESSION_README;

const sleepScore = calculate(
  date,
  bedtimeGoal,
  timeAsleepExcelThreshold,
  timeAsleepFairThreshold,
  timeAsleepPoorThreshold,
  deepGoal,
  remGoal,
  bedtime,
  timeAsleep,
  deep,
  rem,
  true,
);

Logger.info(`Sleep score: ${sleepScore}`);
