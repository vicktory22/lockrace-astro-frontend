export type KVTeam = {
	id: string;
	uid: string;
	slug: string;
	abbreviation: string;
	displayName: string;
	shortDisplayName: string;
	name: string;
	nickname: string;
	location: string;
	color: string;
	alternateColor: string;
	isActive: boolean;
	isAllStar: boolean;
	logos: Logo[];
};

export type KVWeek = {
	label: string;
	startDate: string;
	endDate: string;
	seasonType: number;
	weekNumber: number;
	year: number;
};

export type Logo = {
	href: string;
	alt: string;
	width: number;
	height: number;
};

export type DBGame = {
	game_id: number;
	week_id: number;
	home_team_id: number;
	away_team_id: number;
	home_team_score: number;
	away_team_score: number;
	game_time: number;
	spread: number;
	created_at: number;
	updated_at: number;
};
