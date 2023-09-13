import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.DB_URL;
const dbAuthToken = process.env.DB_AUTH_TOKEN;

if (!dbUrl || !dbAuthToken) {
	throw new Error("DB_URL and DB_AUTH_TOKEN must be set in .env");
}

export default {
	schema: "./src/schema.ts",
	out: "./drizzle",
	driver: "turso",
	dbCredentials: {
		url: dbUrl,
		authToken: dbAuthToken,
	},
} satisfies Config;
