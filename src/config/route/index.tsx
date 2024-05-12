import { Route, RouteProps } from 'react-router-dom';
import { ChatPage } from '../../pages/Chat';
import { RegisterPage } from '../../pages/Register';
import { LoginPage } from '../../pages/Login';
import { NotFoundPage } from '../../pages/NotFound';
import { MainPage } from '../../pages/Main';
import { DialogPage } from '../../pages/Dialog';

export type AutRouterProps = RouteProps & {
	isAuth?: boolean;
};

export enum AppRoutes {
	MAIN = 'main',
	CHAT = 'chat',
	LOGIN = 'login',
	REGISTER = 'register',
	NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/',
	[AppRoutes.CHAT]: '/chat',
	[AppRoutes.LOGIN]: '/login',
	[AppRoutes.REGISTER]: '/register',

	// последний
	[AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AutRouterProps> = {
	[AppRoutes.MAIN]: {
		path: RoutePath.main,
		element: <MainPage />,
	},
	[AppRoutes.CHAT]: {
		path: RoutePath.chat,
		element: <ChatPage />,
		children: <Route path={`${RoutePath.chat}/:id`} element={<DialogPage />} />,
		isAuth: true,
	},
	[AppRoutes.LOGIN]: {
		path: RoutePath.login,
		element: <LoginPage />,
	},
	[AppRoutes.REGISTER]: {
		path: RoutePath.register,
		element: <RegisterPage />,
	},

	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFoundPage />,
	},
};
