import { UserShema } from '../../types/user';
import { ErrorResponseType } from './store';

export interface AuthState {
	data?: UserShema;
	error?: ErrorResponseType;
	isLoading: boolean;
}
