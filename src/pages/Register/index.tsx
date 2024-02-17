import React, { FormEvent, useState } from 'react';
import axios from '../../config/api/axios';

const RegistrationPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await axios.post('/Account/Register', {
				username: username,
				password: password,
			});
			console.log('Успешная регистрация:', response.data);
			// Здесь можно выполнить дополнительные действия после успешной регистрации
		} catch (error) {
			console.error('Ошибка регистрации:', error);
			// Здесь можно обработать ошибку регистрации
		}
	};

	return (
		<div>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Имя пользователя:</label>
					<input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div>
					<label htmlFor="password">Пароль:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit">Зарегистрироваться</button>
			</form>
		</div>
	);
};

export default RegistrationPage;
