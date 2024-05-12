import { Navigate, useLocation } from 'react-router-dom';
import { getAuthDataSelector } from '../store/selectors/login';
import { useAppSelector } from '../hooks/useAppSelector';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const location = useLocation();
	const isAuth = useAppSelector(getAuthDataSelector);

	if (!isAuth) {
		return <Navigate to="/" replace state={{ path: location.pathname }} />;
	}

	return children;
};
