import { createClient } from "@libsql/client/web";
import { getConfig } from "../services/database/database-config";
import { drizzle } from "drizzle-orm/libsql";
import { picks } from "../schema";
import { eq } from "drizzle-orm";

type AddPicksParams = {
	user_id: string;
	game_id: number;
	team_id: number;
	week_id: number;
	spread: number;
	updated_at: number;
	created_at: number;
};

export function PicksServiceManager(_environment: string) {
	return PicksService();
}

export function PicksService() {
	const client = createClient(getConfig());

	const db = drizzle(client);

	return {
		getPickByWeekId(userId: string, weekId: number) {
			return db
				.select()
				.from(picks)
				.where(eq(picks.userId, userId))
				.where(eq(picks.weekId, weekId))
				.all();
		},

		getPicks(userId: string) {
			return db.select().from(picks).where(eq(picks.userId, userId)).all();
		},

		getAllPicks() {
			return db.select().from(picks).all();
		},

		addPick(params: AddPicksParams) {
			const newPick: typeof picks.$inferInsert = {
				userId: params.user_id,
				gameId: params.game_id,
				teamId: params.team_id,
				weekId: params.week_id,
				spread: params.spread,
				updatedAt: params.updated_at,
				createdAt: params.created_at,
			};

			return db.insert(picks).values(newPick).execute();
		},
	};
}
