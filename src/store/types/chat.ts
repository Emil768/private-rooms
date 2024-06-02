import { Dialog, Dialogs } from './dialog';

export interface ChatState {
	search: string;
	users?: Dialog[];
	isLoading: boolean;
	error?: string;
	contacts: Dialogs[];
	unAddedContacts: Dialogs[];
	isInitFetchContacts: boolean;
}

export interface UserContactsResponseState {
	contacts: Dialog[];
}
