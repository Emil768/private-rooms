import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { authActions } from './store/slices/auth/login';
import { getAuthDataSelector } from './store/selectors/login';
import { Route, Routes } from 'react-router-dom';
import { ChatPage } from './pages/Chat';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';

function App() {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(getAuthDataSelector);

	useEffect(() => {
		dispatch(authActions.initUser());
	}, [dispatch]);

	return (
		<div>
			<Routes>
				<Route path="/" element={<ChatPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
