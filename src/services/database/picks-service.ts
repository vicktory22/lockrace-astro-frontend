import { createClient } from "@libsql/client/web";
import { getConfig } from "./database-config";

type AddPicksParams = {
	user_id: string;
	game_id: number;
	team_id: number;
	week_id: number;
	spread: number;
	updated_at: number;
	created_at: number;
};

export function PicksService() {
	const client = createClient(getConfig());

	return {
		addPick: (params: AddPicksParams) => {
			const {
				user_id,
				game_id,
				team_id,
				week_id,
				spread,
				updated_at,
				created_at,
			} = params;

			return client.execute({
				sql: "INSERT INTO picks (user_id, game_id, team_id, week_id, spread, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
				args: [
					user_id,
					game_id,
					team_id,
					week_id,
					spread,
					updated_at,
					created_at,
				],
			});
		},
	};
}
