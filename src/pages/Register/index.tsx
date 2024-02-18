import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { Input } from '../../components/Input';
import cls from './Register.module.scss';
import { Button } from '../../components/Button';
import TelegramIcon from '../../assets/icons/telegram.svg?react';
import { getAuthDataErrorSelector, getIsAuthDataLoadingSelector } from '../../store/selectors/login';
import { Text, TextSize, TextTheme } from '../../components/Text';
import { AppLink } from '../../components/AppLink';
import { fetchRegister } from '../../store/actions/auth/register';
import { authActions } from '../../store/slices/auth/login';

export const RegisterPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(getIsAuthDataLoadingSelector);
	const error = useAppSelector(getAuthDataErrorSelector);

	const onAuthClick = async (event: FormEvent) => {
		event.preventDefault();
		dispatch(fetchRegister({ username, password }));
	};

	useEffect(() => {
		return () => {
			dispatch(authActions.resetState());
		};
	}, [dispatch]);

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
					Регистрация
				</Button>
				<AppLink to="/login">
					<Text text="Войти в аккаунт" size={TextSize.TINY} />
				</AppLink>
			</form>
		</div>
	);
};
