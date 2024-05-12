import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtraThunkProps } from '../../types/store';
import { toast } from 'react-toastify';
import { Dialog } from '../../types/dialog';
import { AxiosError } from 'axios';

export const fetchUserGetData = createAsyncThunk<Dialog, string, ExtraThunkProps<string>>(
	'dialog/fetchUserGetData',
	async (userId, { extra, rejectWithValue }) => {
		try {
			const response = await extra.api.post('/Users/Get', {
				userIds: [userId],
			});

			return response.data.users?.[0];
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(`${error?.response?.data.error}`, {
					autoClose: 1500,
					closeOnClick: true,
				});

				return rejectWithValue(error?.response?.data.error);
			}
			throw error;
		}
	},
);
