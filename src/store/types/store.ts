import { AxiosInstance } from 'axios';
import { AuthState } from './login';
import { UserAuthProps } from '../../types/user';
import { NavigateOptions, To } from 'react-router-dom';
import { ChatState } from './chat';
import { DialogState } from './dialog';

export interface StoreSchema {
	auth: AuthState;
	chat: ChatState;
	dialog: DialogState;
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
	state: StoreSchema;
}
