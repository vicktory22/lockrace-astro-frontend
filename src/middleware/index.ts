import { sequence } from "astro:middleware";
import { servicesMiddleware } from "./services.middleware";
import { verifySessionMiddleware } from "./session.middleware";
import { environmentMiddleware } from "./environment.middleware";

export const onRequest = sequence(
	environmentMiddleware,
	verifySessionMiddleware,
	servicesMiddleware,
);
