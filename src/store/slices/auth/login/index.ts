import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../../types/login';
import { fetchAuthData } from '../../../actions/auth/login';
import { fetchRegister } from '../../../actions/auth/register';

const initialState: AuthState = {
	data: null,
	error: undefined,
	isLoading: false,
	isInitialized: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		resetState: (state) => {
			state.data = null;
			state.error = undefined;
			state.isLoading = false;
			state.isInitialized = false;
		},
		initUser: (state) => {
			const user = localStorage.getItem('user');

			if (user) {
				state.data = JSON.parse(user);
			}
			state.isInitialized = true;
		},
	},
	extraReducers: (builder) => {
		builder
			// login

			.addCase(fetchAuthData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAuthData.fulfilled, (state, action: PayloadAction<AuthState['data']>) => {
				state.isLoading = false;
				state.data = action.payload;
				state.error = undefined;
			})
			.addCase(fetchAuthData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			// register

			.addCase(fetchRegister.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchRegister.fulfilled, (state) => {
				state.isLoading = false;
				state.error = undefined;
			})
			.addCase(fetchRegister.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
