import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../types/login';
import { fetchAuthData } from '../../actions/login';
import { UserResponseSchema } from '../../../types/user';

const initialState: AuthState = {
	data: undefined,
	error: undefined,
	isLoading: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		initUser: (state) => {
			const user = localStorage.getItem('user');

			if (user) {
				state.data = JSON.parse(user);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAuthData.fulfilled, (state, action: PayloadAction<UserResponseSchema>) => {
				state.isLoading = false;
				state.data = action.payload.user;
				localStorage.setItem('user', JSON.stringify(action.payload));
			})
			.addCase(fetchAuthData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
