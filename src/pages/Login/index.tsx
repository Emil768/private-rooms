import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import cls from './Login.module.scss';
import { Button } from '../../components/Button';
import TelegramIcon from '../../assets/icons/telegram.svg?react';
import { getAuthDataErrorSelector, getIsAuthDataLoadingSelector } from '../../store/selectors/login';
import { Text, TextSize } from '../../components/Text';
import { AppLink } from '../../components/AppLink';
import { fetchAuthData } from '../../store/actions/auth/login';
import { authActions } from '../../store/slices/auth/login';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const isLoading = useAppSelector(getIsAuthDataLoadingSelector);
	const error = useAppSelector(getAuthDataErrorSelector);

	const onAuthClick = useCallback(
		async (event: FormEvent) => {
			event.preventDefault();
			const result = await dispatch(fetchAuthData({ username, password }));

			if (result.meta.requestStatus === 'fulfilled') {
				navigate('/');
			}
		},
		[username, password],
	);

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
