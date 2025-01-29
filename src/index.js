/* global Logger */
import "dotenv/config";
import moment from "moment";

import "./Logger";
import {
  convertGsheetsDurationToMomentDuration,
  outputMomentDuration,
} from "./util";

const duration = convertGsheetsDurationToMomentDuration(
  new Date("Sat Dec 30 06:54:00 GMT-08:00 1899"),
);

console.log(outputMomentDuration(duration));

const minTwenty = moment.duration({ minutes: 20 });
const minThirty = moment.duration({ minutes: 30 });
const minSixty = moment.duration({ minutes: 60 });

console.log(minTwenty < minThirty && minThirty < minSixty);

Logger.info("hewya");
