export interface User {
	id: string;
	username: string;
}

export interface UserResponse {
	user: User;
	accessToken: string;
	accessTokenExpirationMinutes: number;
	refreshToken: string;
	refreshTokenExpirationMinutes: number;
}
