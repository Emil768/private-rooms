import { createSlice } from '@reduxjs/toolkit';
import { UserResponse } from '../../../types/user';

export interface AuthState {
	data: UserResponse | null;
	error: string | null;
	isLoading: boolean;
}

const initialState: AuthState = {
	data: null,
	error: null,
	isLoading: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
