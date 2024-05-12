import { UserShema } from '../../types/user';
import { ErrorResponseType } from './store';

export interface AuthState {
	data: {
		user?: UserShema;
		accessToken: string;
		accessTokenExpirationMinutes: number;
		refreshToken: string;
		refreshTokenExpirationMinutes: number;
	};
	error?: ErrorResponseType;
	isLoading: boolean;
}
