import { AxiosInstance } from 'axios';
import { AuthState } from './login';
import { UserAuthProps } from '../../types/user';

export interface StoreSchema {
	auth: AuthState;
}

export type ErrorResponseType = Partial<UserAuthProps> | string;

export interface ExtraThunkProps<T> {
	extra: {
		api: AxiosInstance;
	};
	rejectValue: T;
	getState: () => StoreSchema;
}
