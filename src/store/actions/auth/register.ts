import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthProps } from '../../../types/user';
import { ErrorResponseType, ExtraThunkProps } from '../../types/store';
import { AxiosError } from 'axios';
import { validationErrorsAuth } from '../../../utils/validation';
import { toast } from 'react-toastify';
import { AuthState } from '../../types/login';

export const fetchRegister = createAsyncThunk<AuthState['data'], UserAuthProps, ExtraThunkProps<ErrorResponseType>>(
	'auth/fetchRegister',
	async (authData, { extra, rejectWithValue }) => {
		try {
			const errors = validationErrorsAuth(authData);

			if (Object.keys(errors).length !== 0) {
				return rejectWithValue(errors);
			}

			const { username, password } = authData;

			const response = await extra.api.post<AuthState['data']>('/Account/Register', {
				username,
				password,
			});

			toast.success('Success', {
				autoClose: 1500,
				closeOnClick: true,
			});

			extra.navigate('/login');

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
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
