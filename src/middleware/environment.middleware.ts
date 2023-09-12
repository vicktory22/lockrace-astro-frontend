import { defineMiddleware } from "astro:middleware";

export const environmentMiddleware = defineMiddleware((context, next) => {
	// @ts-ignore
	context.locals.environment = import.meta.env;
	return next();
});
