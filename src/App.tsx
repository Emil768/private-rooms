import { useEffect } from 'react';
import { authActions } from './store/slices/auth/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';
import AppRouter from './router';
import { useAppDispatch } from './hooks/useAppDispatch';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(authActions.initUser());
	}, [dispatch]);

	return (
		<div className="App">
			<AppRouter />
			<ToastContainer />
		</div>
	);
}

export default App;
