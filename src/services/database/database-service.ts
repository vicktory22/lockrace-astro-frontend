import { createClient } from "@libsql/client/web";
import { getConfig } from "./database-config";

export function GamesService() {
	const client = createClient(getConfig());

	return {
		getGames: (weekId: number) =>
			client.execute({
				sql: "SELECT * FROM games WHERE week_id = ? ORDER BY game_time ASC",
				args: [weekId],
			}),

		getGame: (id: number) =>
			client.execute({
				sql: "SELECT * FROM games WHERE game_id = ?",
				args: [id],
			}),
	};
}
