import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { Input } from '../../components/Input';
import cls from './Login.module.scss';
import { Button } from '../../components/Button';
import TelegramIcon from '../../assets/icons/telegram.svg?react';
import { getAuthDataErrorSelector, getIsAuthDataLoadingSelector } from '../../store/selectors/login';
import { Text, TextSize, TextTheme } from '../../components/Text';
import { AppLink } from '../../components/AppLink';
import { fetchAuthData } from '../../store/actions/auth/login';
import { authActions } from '../../store/slices/auth/login';

export const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(getIsAuthDataLoadingSelector);
	const error = useAppSelector(getAuthDataErrorSelector);

	const onAuthClick = async (event: FormEvent) => {
		event.preventDefault();
		dispatch(fetchAuthData({ username, password }));
	};

	useEffect(() => {
		return () => {
			dispatch(authActions.resetState());
		};
	}, []);

	return (
		<div className={cls.login}>
			<form onSubmit={onAuthClick} className={cls.form}>
				<TelegramIcon className={cls.icon} />
				<Input
					className={cls.username}
					type="text"
					value={username}
					onChange={setUsername}
					placeholder="Username"
					maxLength={16}
					error={(typeof error !== 'string' && error?.username) || ''}
				/>
				<Input
					className={cls.password}
					type="password"
					value={password}
					onChange={setPassword}
					placeholder="Password"
					maxLength={20}
					error={(typeof error !== 'string' && error?.password) || ''}
				/>
				<Button type="submit" className={cls.button} isLoading={isLoading}>
					Войти
				</Button>
				<AppLink to="/register">
					<Text text="Создать аккаунт" size={TextSize.TINY} />
				</AppLink>
			</form>
		</div>
	);
};
