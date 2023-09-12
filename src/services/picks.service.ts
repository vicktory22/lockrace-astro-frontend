import { createClient } from "@libsql/client/web";
import { getConfig } from "../services/database/database-config";

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

  return {
    getPicks(userId: string) {
      return client.execute({
        sql: "SELECT * FROM picks WHERE user_id = ?",
        args: [userId],
      });
    },

    getAllPicks() {
      return client.execute("SELECT * FROM picks");
    },

    addPick(params: AddPicksParams) {
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
