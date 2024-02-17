import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authReducer } from './slices/login';
import { StoreSchema } from './types/store';
import axios from '../config/api/axios';

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
				},
			},
		}),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<StoreSchema> = useSelector;

export default store;
