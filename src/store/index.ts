import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authReducer } from './slices/auth/login';
import { ReduxStoreProps, StoreSchema } from './types/store';
import axios from '../config/api/axios';

export const createReduxStore = ({ navigate }: ReduxStoreProps) => {
	const store = configureStore<StoreSchema>({
		reducer: {
			auth: authReducer,
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

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreSchema> = useSelector;
