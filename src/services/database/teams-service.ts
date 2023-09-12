import teamsJson from "./teams-from-kv.json";
import type { KVTeam } from "../../types";

export function TeamsService() {
	return {
		getTeams: (): Promise<KVTeam[]> => Promise.resolve(teamsJson),
	};
}
