/// <reference types="astro/client" />
import type { AdvancedRuntime } from "@astrojs/cloudflare";

import type { User } from "@clerk/backend";
import type { Client } from "@libsql/client";
import { TeamsService } from "./services/database/teams-service";
import { GamesService } from "./services/games.service";

declare namespace Astro {
	interface Locals extends AdvancedRuntime {
		user: User;
		db: Client;
		environment: string;
		teamsService: TeamsService;
		gamesService: GamesService;
	}
}
