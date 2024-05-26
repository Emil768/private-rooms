import { memo, useEffect } from 'react';
import { Dialog } from '../dialog';
import {
	getChatUsersDataSelector,
	getContactsUsersDataSelector,
	getIsInitializedContactsSelector,
} from '../../../../store/selectors/chat';
import { fetchUserGetContacts } from '../../../../store/actions/chat/fetchUserGetContacts';
import cls from './dialogs.module.scss';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { getUserDialogsSelector } from '../../../../store/selectors/dialog';
import { chatActions } from '../../../../store/slices/chat';

export const Dialogs = memo(() => {
	const { id } = useParams<string>();
	const dispatch = useAppDispatch();
	const users = useAppSelector(getChatUsersDataSelector);
	const userDialogs = useAppSelector(getUserDialogsSelector);
	const contacts = useAppSelector(getContactsUsersDataSelector);
	const isInitializedContacts = useAppSelector(getIsInitializedContactsSelector);

	useEffect(() => {
		if (!isInitializedContacts) {
			dispatch(fetchUserGetContacts(null));
		} else {
			if (!localStorage.getItem('contacts')) {
				localStorage.setItem('contacts', JSON.stringify([]));
			} else {
				dispatch(chatActions.setContacts(JSON.parse(localStorage.getItem('contacts')!)));
			}
		}
	}, [isInitializedContacts, chatActions.setContacts]);

	return (
		<div className={cls.Dialogs}>
			{contacts?.length ? (
				<div className={cls.contacts}>
					<div className={cls.title}>Контакты</div>
					{contacts.map((item) => (
						<Dialog
							activeDialog={id === item.id}
							length={
								userDialogs && userDialogs[item.id]?.length ? String(userDialogs[item.id]?.length) : ''
							}
							dialog={item}
							key={item.id}
						/>
					))}
				</div>
			) : null}

			{users?.length ? (
				<div className={cls.dialogs}>
					<div className={cls.title}>Пользователи</div>
					{users.map((item) => (
						<Dialog
							length={
								userDialogs && userDialogs[item.id]?.length ? String(userDialogs[item.id]?.length) : ''
							}
							activeDialog={id === item.id}
							dialog={item}
							key={item.id}
						/>
					))}
				</div>
			) : null}
		</div>
	);
});
