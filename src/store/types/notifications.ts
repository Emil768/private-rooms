export interface MessageReceivedState {
	content: string;
	id: string;
	messageType: number;
	receiverId: string;
	senderId: string;
}

export interface UserNotificationState {
	userId: string;
	username: string;
	onlineStatus: number;
}

export type UserIdType = Pick<UserNotificationState, 'userId'>;
