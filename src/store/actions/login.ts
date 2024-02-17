import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthProps, UserResponseSchema } from '../../types/user';
import { ErrorResponseType, ExtraThunkProps } from '../types/store';
import { AxiosError } from 'axios';

export const fetchAuthData = createAsyncThunk<UserResponseSchema, UserAuthProps, ExtraThunkProps<ErrorResponseType>>(
	'auth/fetchAuthData',
	async (authData, { extra, rejectWithValue }) => {
		try {
			const { username, password } = authData;
			const response = await extra.api.post<UserResponseSchema>('/Auth/Login', {
				username,
				password,
			});

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.data.error) {
					return rejectWithValue(error.response?.data.error);
				} else {
					return rejectWithValue(error.response?.data.errors);
				}
			}
			throw error;
		}
	},
);
