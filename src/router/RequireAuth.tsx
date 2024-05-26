import { Navigate, useLocation } from 'react-router-dom';
import { getAuthDataSelector } from '../store/selectors/login';
import { useAppSelector } from '../hooks/useAppSelector';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
	const location = useLocation();
	const authData = useAppSelector(getAuthDataSelector);

	if (!authData) {
		return <Navigate to="/login" replace state={{ path: location.pathname }} />;
	}

	return children;
};
