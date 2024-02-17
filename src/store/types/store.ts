import { AxiosInstance } from 'axios';
import { AuthState } from './login';

export interface StoreSchema {
	auth: AuthState;
}

export interface ErrorValidationProps {
	Username?: string[];
	Password?: string[];
}

export type ErrorResponseType = ErrorValidationProps | string;

export interface ExtraThunkProps<T> {
	extra: {
		api: AxiosInstance;
	};
	rejectValue: T;
	getState: () => StoreSchema;
}
