import { Clerk, verifyToken } from "@clerk/backend";
import { defineMiddleware } from "astro:middleware";

export const verifySessionMiddleware = defineMiddleware(
	async (context, next) => {
		if (
			context.url.pathname === "/login" ||
			context.url.pathname === "/register"
		) {
			return next();
		}

		if (!import.meta.env.PROD) {
			// @ts-ignore
			context.locals.user = localAuth;
			return next();
		}

		const cookies = context.request.headers.get("cookie");

		const session =
			cookies
				?.split(";")
				.find((cookie) => cookie.trim().startsWith("__session"))
				?.split("=")[1] || "";

		const [result] = await Promise.allSettled([
			verifyToken(session, {
				secretKey: import.meta.env.CLERK_SECRET_KEY,
				authorizedParties: [
					"https://lockrace-astro-frontend.pages.dev",
					"https://lockrace.com",
					"http://localhost:4321",
					"http://localhost:8788",
					"http://192.168.0.16:8788",
				],
				issuer: `https://${import.meta.env.PUBLIC_CLERK_URL}`,
				skipJwksCache: true,
			}),
		]);

		if (result.status === "rejected") {
			return context.redirect("/login", 302);
		}

		const clerk = Clerk({
			secretKey: import.meta.env.CLERK_SECRET_KEY,
		});

		const user = await clerk.users.getUser(result.value.sub);

		context.locals.user = user;

		return next();
	},
);

const localAuth = {
	id: "xxx",
};
