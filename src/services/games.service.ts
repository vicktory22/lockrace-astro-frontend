import { createClient } from "@libsql/client/web";
import { getConfig } from "./database/database-config";
import { fromTimestamp } from "../utils/dates";
import type { DBGame } from "../types";

export function GamesService() {
	const client = createClient(getConfig());

	return {
		async getGames(weekId: number): Promise<DBGame[]> {
			const resultSet = await client.execute({
				sql: "SELECT * FROM games WHERE week_id = ? ORDER BY game_time ASC",
				args: [weekId],
			});

			return resultSet.rows.map((row): DBGame => {
				const gameTime = fromTimestamp(row.game_time as number);

				return {
					...row,
					game_time: gameTime,
				} as unknown as DBGame;
			});
		},

		getGame: (id: number) =>
			client.execute({
				sql: "SELECT * FROM games WHERE game_id = ?",
				args: [id],
			}),
	};
}
