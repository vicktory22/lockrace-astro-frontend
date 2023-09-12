import { defineMiddleware } from "astro:middleware";
import { TeamsService } from "../services/database/teams-service";
import { GamesService } from "../services/database/database-service";
import { WeeksServiceManager } from "../services/weeks.service";
import { PicksServiceManager } from "../services/picks.service";

export const servicesMiddleware = defineMiddleware((context, next) => {
  const environment = context.locals.environment;

	context.locals.teamsService = TeamsService();
	context.locals.gamesService = GamesService();
  context.locals.weeksService = WeeksServiceManager(
    environment,
    context.locals.runtime?.env.FOOTBALL_METADATA
  );
  context.locals.picksService = PicksServiceManager(environment);

	return next();
});
