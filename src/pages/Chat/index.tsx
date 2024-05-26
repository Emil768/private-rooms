import React, { useState, useEffect } from 'react';
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
import { getContactsUsersDataSelector } from '../../store/selectors/chat';
import { MessageReceivedState, UserIdType, UserNotificationState } from '../../store/types/notifications';

export const ChatPage = () => {
	const { events } = Connector();
	const [messageReceived, setMessageReceived] = useState<null | MessageReceivedState>(null);
	const [сontactAdded, setContactAdded] = useState<UserNotificationState>();
	const [сontactDeleted, setContactDeleted] = useState<UserIdType>();
	const [userOnlineId, setUserOnlineId] = useState<string>();
	const [userOfflineId, setUserOfflineId] = useState<string>();

	const dispatch = useAppDispatch();

	const currentUser = useAppSelector(getCurrentUserSelector);
	const contacts = useAppSelector(getContactsUsersDataSelector);

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
		if (messageReceived && Object.keys(messageReceived).length > 0) {
			if (messageReceived.senderId !== currentUser?.id) {
				const currentUserName = contacts.find((contact) => contact.id === messageReceived.senderId)?.username;

				toast.success(
					`Новое сообщения от ${currentUserName || 'Аноним'}
					
				 `,
					{
						autoClose: 5000,
						closeOnClick: true,
					},
				);
			}

			const dialogs = JSON.parse(localStorage.getItem('dialogs')!);

			const targetId =
				messageReceived.senderId === currentUser?.id ? messageReceived.receiverId : messageReceived.senderId;

			if (!dialogs[targetId]) {
				dialogs[targetId] = [];
			}

			dialogs[targetId].push(messageReceived);

			setMessageReceived(null);

			dispatch(dialogActions.setUserDialog(dialogs));

			localStorage.setItem('dialogs', JSON.stringify({ ...dialogs }));
		}
	}, [messageReceived]);

	useEffect(() => {
		if (сontactAdded) {
			dispatch(chatActions.setContacts([...contacts, { ...сontactAdded, id: сontactAdded.userId }]));
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
