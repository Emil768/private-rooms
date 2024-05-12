import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cls from './Dialog.module.scss';
import { fetchUserGetData } from '../../store/actions/dialog/fetchUserGetData';
import {
	getDialogMessageTextSelector,
	getDialogUserDataSelector,
	getIsContactExistingSelector,
	getUserDialogsSelector,
} from '../../store/selectors/dialog';
import { Input, InputTheme } from '../../components/Input';
import { Button } from '../../components/Button';
import { Avatar } from '../../components/Avatar';
import ContactPlusIcon from '../../assets/icons/contactPlus.svg?react';
import ContactMinusIcon from '../../assets/icons/contactMinus.svg?react';
import SendIcon from '../../assets/icons/send.svg?react';
import { fetchAddUserContact } from '../../store/actions/dialog/fetchAddUserContact';
import { fetchSendUserMessage } from '../../store/actions/dialog/fetchSendUserMessage';
import { Message } from './components/Message';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { MessageReceivedState } from '../../store/types/dialog';
import { dialogActions } from '../../store/slices/dialog';

export const DialogPage = () => {
	const { id } = useParams<string>();
	const dispatch = useAppDispatch();
	const user = useAppSelector(getDialogUserDataSelector);
	const isContactExisting = useAppSelector(getIsContactExistingSelector);
	const dialogs = useAppSelector(getUserDialogsSelector);
	const messageText = useAppSelector(getDialogMessageTextSelector);

	useEffect(() => {
		if (id) {
			dispatch(fetchUserGetData(id));
		}
	}, [id]);

	const onContactAdd = useCallback(() => {
		if (id) {
			dispatch(fetchAddUserContact(id));
		}
	}, [id]);

	const onMessageSend = useCallback(() => {
		if (id) {
			dispatch(
				fetchSendUserMessage({
					receiverId: id,
					content: messageText,
					messageType: 0,
				}),
			);
			dispatch(dialogActions.setMessageText(''));
		}
	}, [id, messageText]);

	const onSetMessageText = useCallback((value: string) => {
		dispatch(dialogActions.setMessageText(value));
	}, []);

	return (
		<div className={cls.Dialog}>
			<div className={cls.header}>
				<div className={cls.info}>
					<Avatar username={user?.username || ''} />
					<div>{user?.username}</div>
				</div>
				{isContactExisting ? (
					<div className={cls.options}>
						<ContactMinusIcon onClick={onContactAdd} />
					</div>
				) : (
					<div className={cls.options}>
						<ContactPlusIcon onClick={onMessageSend} />
					</div>
				)}
			</div>
			<div className={cls.content}>
				{dialogs && id && dialogs[id]
					? dialogs[id].map((dialog: MessageReceivedState) => <Message message={dialog} key={dialog.id} />)
					: null}
			</div>
			<div className={cls.bottom}>
				<Input
					value={messageText}
					onChange={onSetMessageText}
					theme={InputTheme.CIRCLE}
					className={cls.input}
				/>
				<Button className={cls.button} onClick={onMessageSend}>
					<SendIcon />
				</Button>
			</div>
		</div>
	);
};
