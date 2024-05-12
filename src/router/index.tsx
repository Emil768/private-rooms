import { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AutRouterProps, routeConfig } from '../config/route';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AutRouterProps) => {
		return (
			<Route
				key={route.path}
				path={route.path}
				element={route.isAuth ? <RequireAuth>{<>{route.element}</>}</RequireAuth> : <>{route.element}</>}
				children={route.children}
			/>
		);
	}, []);

	return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;
