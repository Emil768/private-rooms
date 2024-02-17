import React, { FormEvent, useState } from 'react';
import axios from '../../config/api/axios';
import { useAppDispatch } from '../../store';
import { fetchAuthData } from '../../store/actions/login';

export const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useAppDispatch();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		dispatch(fetchAuthData({ username, password }));
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
