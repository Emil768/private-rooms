import { AxiosInstance } from 'axios';
import { AuthState } from './login';
import { UserAuthProps } from '../../types/user';
import { NavigateOptions, To } from 'react-router-dom';

export interface StoreSchema {
	auth: AuthState;
}

export type ErrorResponseType = Partial<UserAuthProps> | string;

export interface ReduxStoreProps {
	navigate: (to: To, options?: NavigateOptions) => void;
}

export interface ExtraThunkProps<T> {
	extra: {
		api: AxiosInstance;
		navigate: (to: To, options?: NavigateOptions) => void;
	};
	rejectValue: T;
	getState: () => StoreSchema;
}
