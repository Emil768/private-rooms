import React, { FormEvent, useState } from 'react';
import axios from '../../config/api/axios';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const response = await axios.post('/Auth/Login', { username, password });
			console.log('Успешный вход:', response.data);

			localStorage.setItem('user', JSON.stringify(response.data));
		} catch (error) {
			console.error('Ошибка входа:', error);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};
