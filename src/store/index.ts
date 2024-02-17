import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authReducer } from './slices/login';

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
