import { useEffect } from 'react';

import './App.css';
import { Login } from './pages/Login';
import { useAppDispatch, useAppSelector } from './store';

import { authActions } from './store/slices/login';
import { getAuthDataSelector } from './store/selectors/login';

function App() {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(getAuthDataSelector);
	useEffect(() => {
		dispatch(authActions.initUser());
	}, [dispatch]);

	return (
		<div>
			<div>{isAuth ? 'Выйти' : 'Войти'}</div>
			<Login />
		</div>
	);
}

export default App;
