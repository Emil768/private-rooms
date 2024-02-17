import { UserShema } from '../../types/user';
import { ErrorValidationProps } from './store';

export interface AuthState {
	data?: UserShema;
	error?: string | ErrorValidationProps;
	isLoading: boolean;
}
