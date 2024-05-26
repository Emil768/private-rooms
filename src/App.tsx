import { useEffect } from 'react';
import { authActions } from './store/slices/auth/login';
import { ToastContainer } from 'react-toastify';
import AppRouter from './router';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import { getIsInitializedSelector } from './store/selectors/login';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';

function App() {
	const dispatch = useAppDispatch();
	const isInitialized = useAppSelector(getIsInitializedSelector);

	useEffect(() => {
		dispatch(authActions.initUser());
	}, [dispatch]);

	return (
		<div className="App">
			{isInitialized && <AppRouter />}
			<ToastContainer />
		</div>
	);
}

export default App;
