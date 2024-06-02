import { MessageReceivedState } from './notifications';

export interface DialogState {
	user?: Dialog;
	dialogs?: Record<string, MessageReceivedState[]>;
	isLoading: boolean;
	error?: string;
	messageText: string;
}

export interface DialogResponseState {
	users?: Dialog[];
}

export interface SendMessageReponseState {
	receiverId: string;
	content: string;
	messageType: number;
}

export interface SendMessageProps {
	id: string;
	content: string;
	messageType: number;
}

export interface Dialog {
	id: string;
	username: string;
	onlineStatus: number;
}

export interface Dialogs extends Dialog {
	unAdded?: boolean;
}
