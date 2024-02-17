export interface UserAuthProps {
	username: string;
	password: string;
}

export interface UserShema {
	id: string;
	username: string;
}

export interface UserResponseSchema {
	user: UserShema;
	accessToken: string;
	accessTokenExpirationMinutes: number;
	refreshToken: string;
	refreshTokenExpirationMinutes: number;
}
