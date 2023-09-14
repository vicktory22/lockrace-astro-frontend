import { fromUnixTime } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export function fromTimestamp(timestamp: number) {
	return utcToZonedTime(fromUnixTime(timestamp), "America/Los_Angeles");
}
