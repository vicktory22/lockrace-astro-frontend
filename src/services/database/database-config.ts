export type DBConfig = {
	url: string;
	authToken?: string;
};

export function getConfig(): DBConfig {
	const url = import.meta.env.DB_URL;

	if (import.meta.env.PROD) {
		return {
			url,
			authToken: import.meta.env.DB_AUTH_TOKEN,
		};
	}

	return {
		url,
	};
}
