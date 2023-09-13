import { isAfter, isBefore, parseISO } from "date-fns";
import type { KVWeek } from "../types";
import weeksJson from "./fake-kv-weeks.json";

// rome-ignore lint/suspicious/noExplicitAny: fix later
export function WeeksServiceManager(environment: string, store: any) {
	if (environment === "production") {
		return WeeksService(store);
	}

	return WeeksServiceFake();
}

function WeeksServiceFake() {
	return {
		async getWeekId(): Promise<number> {
			const weeks: KVWeek[] = weeksJson;

			const week = weeks.find((week) => {
				return (
					isBefore(Date.now(), parseISO(week.endDate)) &&
					isAfter(Date.now(), parseISO(week.startDate))
				);
			});

			if (!week) {
				throw new Error("No week found");
			}

			return week.weekNumber;
		},
	};
}

// rome-ignore lint/suspicious/noExplicitAny: fix later
function WeeksService(store: any) {
	return {
		async getWeekId(): Promise<number> {
			const weeks: KVWeek[] = await store.get("weeks");

			console.log(weeks);
			const week = weeks.find((week) => {
				return (
					isBefore(Date.now(), parseISO(week.endDate)) &&
					isAfter(Date.now(), parseISO(week.startDate))
				);
			});

			if (!week) {
				throw new Error("No week found");
			}

			return week.weekNumber;
		},
	};
}
