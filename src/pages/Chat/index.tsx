import React, { useState, useEffect } from 'react';
import Connector from '../../config/signalr/signalr-connection';
import { SideBar } from './components/sidebar';
import { Outlet } from 'react-router-dom';
import cls from './Chat.module.scss';
import { toast } from 'react-toastify';
import { dialogActions } from '../../store/slices/dialog';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { MessageReceivedState } from '../../store/types/dialog';
import { getCurrentUserSelector } from '../../store/selectors/login';

export const ChatPage = () => {
	const { events } = Connector();
	const [messageReceived, setMessageReceived] = useState<null | MessageReceivedState>(null);
	const [сontactAdded, setContactAdded] = useState<MessageReceivedState>();
	const [сontactDeleted, setContactDeleted] = useState<MessageReceivedState>();
	const [userOnline, setUserOnline] = useState<MessageReceivedState>();
	const [userOffline, setUserOffline] = useState<MessageReceivedState>();

	const dispatch = useAppDispatch();

	const currentUser = useAppSelector(getCurrentUserSelector);

	const onMessageReceivedHandler = (notification: MessageReceivedState) => setMessageReceived(notification);
	const onContactAddedCheckHandler = (notification: MessageReceivedState) => setContactAdded(notification);
	const onContactDeletedCheckHandler = (notification: MessageReceivedState) => setContactDeleted(notification);
	const onUserOnlineCheckHandler = (notification: MessageReceivedState) => setUserOnline(notification);
	const onUserOffflineCheckHandler = (notification: MessageReceivedState) => setUserOffline(notification);

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
				toast.success(
					`Новое сообщения от ${currentUser?.username || 'Аноним'}
					
				 `,
					{
						autoClose: 5000,
						closeOnClick: true,
					},
				);
			}

			const dialogs = JSON.parse(localStorage.getItem('dialogs') as string);

			const targetId =
				messageReceived.senderId === currentUser?.id ? messageReceived.receiverId : messageReceived.senderId;

			if (!dialogs[targetId]) {
				dialogs[targetId] = [];
			}

			dialogs[targetId].push(messageReceived);

			localStorage.setItem('dialogs', JSON.stringify({ ...dialogs }));

			dispatch(dialogActions.setUserDialog(dialogs));

			setMessageReceived(null);
		}
	}, [messageReceived]);

	// TODO
	useEffect(() => {}, [сontactAdded, сontactDeleted]);

	useEffect(() => {}, [userOffline, userOnline]);
	//

	useEffect(() => {
		if (!JSON.parse(localStorage.getItem('dialogs') as string)) {
			localStorage.setItem('dialogs', JSON.stringify({}));
		} else {
			dispatch(dialogActions.setUserDialog(JSON.parse(localStorage.getItem('dialogs') as string)));
		}
	}, [dispatch]);

	return (
		<div className={cls.Chat}>
			<div className={cls.content}>
				<SideBar />
				{/* {!userDialog && <div className={cls.empty}>Выберите кому хотите написать</div>} */}
				<Outlet />
			</div>
		</div>
	);
};
