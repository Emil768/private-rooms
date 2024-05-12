import React, { useEffect } from 'react';
import { Dialog } from '../dialog';
import {
	getChatUsersDataSelector,
	getContactsUsersDataSelector,
	getIsLoadingChatDataSelector,
} from '../../../../store/selectors/chat';
import { fetchUserGetContacts } from '../../../../store/actions/chat/fetchUserGetContacts';
import { Loader, LoaderTheme } from '../../../../components/Loader';
import cls from './dialogs.module.scss';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { getUserDialogsSelector } from '../../../../store/selectors/dialog';

export const Dialogs = () => {
	const { id } = useParams<string>();
	const dispatch = useAppDispatch();
	const users = useAppSelector(getChatUsersDataSelector);
	const userDialogs = useAppSelector(getUserDialogsSelector);
	const contacts = useAppSelector(getContactsUsersDataSelector);
	const isLoading = useAppSelector(getIsLoadingChatDataSelector);

	// TODO: КОСТЫЛЬ, требуется найти способ не запрашивать данные снова
	useEffect(() => {
		dispatch(fetchUserGetContacts(null));
	}, []);

	return (
		<div className={cls.Dialogs}>
			{isLoading ? (
				<Loader className={cls.loader} theme={LoaderTheme.DEFAULT} />
			) : (
				<>
					{contacts?.length ? (
						<div className={cls.contacts}>
							<div className={cls.title}>Контакты</div>
							{contacts.map((item) => (
								<Dialog
									activeDialog={id === item.id}
									length={
										userDialogs && userDialogs[item.id]?.length
											? String(userDialogs[item.id]?.length)
											: ''
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
										userDialogs && userDialogs[item.id]?.length
											? String(userDialogs[item.id]?.length)
											: ''
									}
									activeDialog={id === item.id}
									dialog={item}
									key={item.id}
								/>
							))}
						</div>
					) : null}
				</>
			)}
		</div>
	);
};
