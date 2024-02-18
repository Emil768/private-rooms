import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { authActions } from './store/slices/auth/login';
import { getAuthDataSelector } from './store/selectors/login';
import './styles/index.scss';

function App() {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(getAuthDataSelector);

	useEffect(() => {
		dispatch(authActions.initUser());
	}, [dispatch]);

	return <div>Это АПП!!!</div>;
}

export default App;
