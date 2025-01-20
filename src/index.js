import "dotenv/config";

import { convertGsheetsDurationToMoment, displayMomentDuration } from "./util";

const duration = convertGsheetsDurationToMoment(
  new Date("Sat Dec 30 06:54:00 GMT-08:00 1899"),
);

console.log(displayMomentDuration(duration));
