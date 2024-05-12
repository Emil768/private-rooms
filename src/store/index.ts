import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth/login';
import { ReduxStoreProps } from './types/store';
import axios from '../config/api/axios';
import { chatReducer } from './slices/chat';
import { dialogReducer } from './slices/dialog';

export const createReduxStore = ({ navigate }: ReduxStoreProps) => {
	const store = configureStore({
		reducer: {
			auth: authReducer,
			chat: chatReducer,
			dialog: dialogReducer,
		},
		devTools: true,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: {
						api: axios,
						navigate,
					},
				},
			}),
	});

	return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
