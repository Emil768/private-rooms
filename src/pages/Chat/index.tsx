import { useState, useEffect } from 'react';
import Connector from '../../config/signalr/signalr-connection';
import { SideBar } from './components/sidebar';
import { Outlet } from 'react-router-dom';
import cls from './Chat.module.scss';
import { toast } from 'react-toastify';
import { dialogActions } from '../../store/slices/dialog';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getCurrentUserSelector } from '../../store/selectors/login';
import { chatActions } from '../../store/slices/chat';
import { getUnAddedUserContactsSelector, getUserContactsSelector } from '../../store/selectors/chat';
import { MessageReceivedState, UserIdType, UserNotificationState } from '../../store/types/notifications';
import { fetchUserGetData } from '../../store/actions/dialog/fetchUserGetData';

export const ChatPage = () => {
	const { events } = Connector();
	const [messageReceived, setMessageReceived] = useState<null | MessageReceivedState>(null);
	const [сontactAdded, setContactAdded] = useState<UserNotificationState>();
	const [сontactDeleted, setContactDeleted] = useState<UserIdType>();
	const [userOnlineId, setUserOnlineId] = useState<string>();
	const [userOfflineId, setUserOfflineId] = useState<string>();

	const dispatch = useAppDispatch();

	const currentUser = useAppSelector(getCurrentUserSelector);
	const contacts = useAppSelector(getUserContactsSelector);
	const unAddedContacts = useAppSelector(getUnAddedUserContactsSelector);

	const onMessageReceivedHandler = (notification: MessageReceivedState) => setMessageReceived(notification);
	const onContactAddedCheckHandler = (notification: UserNotificationState) => setContactAdded(notification);
	const onContactDeletedCheckHandler = (notification: UserIdType) => setContactDeleted(notification);
	const onUserOnlineCheckHandler = (notification: string) => setUserOnlineId(notification);
	const onUserOffflineCheckHandler = (notification: string) => setUserOfflineId(notification);

	useEffect(() => {
		events(
			onMessageReceivedHandler,
			onContactAddedCheckHandler,
			onContactDeletedCheckHandler,
			onUserOnlineCheckHandler,
			onUserOffflineCheckHandler,
		);
	}, []);

	useEffect(() => {
		async function handleMessage() {
			if (messageReceived && Object.keys(messageReceived).length > 0) {
				if (messageReceived.senderId !== currentUser?.id) {
					const senderUser = contacts.find((contact) => contact.id === messageReceived.senderId);

					if (!senderUser) {
						const senderUnAddedUser = unAddedContacts.find(
							(contact) => contact.id === messageReceived.senderId,
						);

						if (!senderUnAddedUser) {
							const { payload } = await dispatch(fetchUserGetData(messageReceived.senderId));

							if (payload) {
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								dispatch(chatActions.setUnAddedContacts([...unAddedContacts, { ...payload }]));

								toast.success(
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-ignore
									`Новое сообщения от ${payload?.username || 'Аноним'}
							`,
									{
										autoClose: 5000,
										closeOnClick: true,
									},
								);
							}
						} else {
							toast.success(
								`Новое сообщения от ${senderUnAddedUser?.username}
						`,
								{
									autoClose: 5000,
									closeOnClick: true,
								},
							);
						}
					} else {
						toast.success(
							`Новое сообщения от ${senderUser?.username}
					`,
							{
								autoClose: 5000,
								closeOnClick: true,
							},
						);
					}
				}

				const dialogs = JSON.parse(localStorage.getItem('dialogs')!);

				const targetId =
					messageReceived.senderId === currentUser?.id
						? messageReceived.receiverId
						: messageReceived.senderId;

				if (!dialogs[targetId]) {
					dialogs[targetId] = [];
				}

				dialogs[targetId].push(messageReceived);

				setMessageReceived(null);

				dispatch(dialogActions.setUserDialog(dialogs));

				localStorage.setItem('dialogs', JSON.stringify({ ...dialogs }));
			}
		}

		handleMessage();
	}, [messageReceived]);

	useEffect(() => {
		if (сontactAdded) {
			const newUnAddedContacts = unAddedContacts.filter((contact) => contact.id !== сontactAdded.userId);

			dispatch(chatActions.setContacts([...contacts, { id: сontactAdded.userId, ...сontactAdded }]));
			dispatch(chatActions.setUnAddedContacts(newUnAddedContacts));
		}

		if (сontactDeleted) {
			dispatch(chatActions.setContacts([...contacts.filter((contact) => contact.id !== сontactDeleted.userId)]));
		}
	}, [сontactAdded, сontactDeleted]);

	useEffect(() => {
		if (userOnlineId) {
			const userOnlineName = contacts.find((contact) => contact.id === userOnlineId)?.username;
			toast.success(
				`Пользователь ${userOnlineName || 'Аноним'} теперь онлайн
				
			 `,
				{
					autoClose: 5000,
					closeOnClick: true,
				},
			);
		}

		if (userOfflineId) {
			const userOnlineName = contacts.find((contact) => contact.id === userOfflineId)?.username;
			toast.success(
				`Пользователь ${userOnlineName || 'Аноним'} вышел из сети
				
			 `,
				{
					autoClose: 5000,
					closeOnClick: true,
				},
			);
		}
	}, [userOnlineId, userOfflineId, dispatch]);
	//

	useEffect(() => {
		if (!JSON.parse(localStorage.getItem('dialogs') as string)) {
			localStorage.setItem('dialogs', JSON.stringify({}));
		} else {
			dispatch(dialogActions.setUserDialog(JSON.parse(localStorage.getItem('dialogs')!)));
		}
	}, []);

	return (
		<div className={cls.Chat}>
			<div className={cls.content}>
				<SideBar />
				<Outlet />
			</div>
		</div>
	);
};
