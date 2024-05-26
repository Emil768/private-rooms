import * as signalR from '@microsoft/signalr';
import { MessageReceivedState, UserIdType, UserNotificationState } from '../../store/types/notifications';

class Connector {
	private connection: signalR.HubConnection;
	public events: (
		onMessageReceived: (notification: MessageReceivedState) => void,
		onContactAdded: (notification: UserNotificationState) => void,
		onContactDeleted: (notification: UserIdType) => void,
		onUserOnlineCheck: (notification: string) => void,
		onUserOfflineCheck: (notification: string) => void,
	) => void;
	static instance: Connector;
	constructor() {
		this.connection = new signalR.HubConnectionBuilder()
			.withUrl(`${import.meta.env.VITE_HOST}/NotificationHub`, {
				accessTokenFactory: () => this.getAccessToken(),
				skipNegotiation: true,
				transport: signalR.HttpTransportType.WebSockets,
				// transport: signalR.HttpTransportType.ServerSentEvents || signalR.HttpTransportType.LongPolling,
			})
			.withAutomaticReconnect()
			.build();
		this.connection.start().catch((err) => document.write(err));
		this.events = (onMessageReceived, onContactAdded, onContactDeleted, onUserOnlineCheck, onUserOfflineCheck) => {
			this.connection.on('ReceiveMessage', (notification) => {
				onMessageReceived(notification);
			});
			this.connection.on('ContactAdded', (notification: UserNotificationState) => {
				onContactAdded(notification);
			});
			this.connection.on('ContactDeleted', (notification) => {
				onContactDeleted(notification);
			});
			this.connection.on('UserOnline', (notification) => {
				onUserOnlineCheck(notification);
			});
			this.connection.on('UserOffline', (notification) => {
				onUserOfflineCheck(notification);
			});
		};
	}

	public static getInstance(): Connector {
		if (!Connector.instance) Connector.instance = new Connector();
		return Connector.instance;
	}

	getAccessToken(): string {
		const user = localStorage.getItem('user');
		let accessToken = null;
		if (user) {
			accessToken = JSON.parse(user).accessToken;
		}

		return accessToken;
	}
}
export default Connector.getInstance;
