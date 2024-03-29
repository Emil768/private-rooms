import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthProps, UserResponseSchema } from '../../../types/user';
import { ErrorResponseType, ExtraThunkProps } from '../../types/store';
import { AxiosError } from 'axios';
import { validationErrorsAuth } from '../../../utils/validation';
import { toast } from 'react-toastify';

export const fetchAuthData = createAsyncThunk<UserResponseSchema, UserAuthProps, ExtraThunkProps<ErrorResponseType>>(
	'auth/fetchAuthData',
	async (authData, { extra, rejectWithValue }) => {
		try {
			const errors = validationErrorsAuth(authData);

			if (Object.keys(errors).length !== 0) {
				return rejectWithValue(errors);
			}

			const { username, password } = authData;

			const response = await extra.api.post<UserResponseSchema>('/Auth/Login', {
				username,
				password,
			});

			toast.success('Success', {
				autoClose: 1500,
				closeOnClick: true,
			});

			extra.navigate('/');

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data.error);
				toast.error(error.response?.data.error, {
					autoClose: 1500,
					closeOnClick: true,
				});
				return rejectWithValue(error.response?.data.error);
			}
			throw error;
		}
	},
);
