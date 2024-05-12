import { Dialog } from './dialog';

export interface ChatState {
	search: string;
	users?: Dialog[];
	isLoading: boolean;
	error?: string;
	contacts: Dialog[];
}

export interface UserContactsResponseState {
	contacts: Dialog[];
}
