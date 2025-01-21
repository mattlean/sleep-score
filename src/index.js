import "dotenv/config";

import { setBedtimeRanges } from "./params";
import { convertGsheetsDurationToMoment, displayMomentDuration } from "./util";

console.log(setBedtimeRanges(new Date("Sat Dec 30 06:00:00 GMT-08:00 1899")));

const duration = convertGsheetsDurationToMoment(
  new Date("Sat Dec 30 06:54:00 GMT-08:00 1899"),
);

console.log(displayMomentDuration(duration));
