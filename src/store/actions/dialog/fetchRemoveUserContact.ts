import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtraThunkProps } from '../../types/store';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const fetchRemoveUserContact = createAsyncThunk<null, string, ExtraThunkProps<string>>(
	'dialog/fetchRemoveUserContact',
	async (userId, { extra, rejectWithValue }) => {
		try {
			await extra.api.delete('/Contacts/Delete', {
				data: { userIds: [userId] },
			});

			toast.success('Контакт успешно удален', {
				autoClose: 1500,
				closeOnClick: true,
			});

			return null;
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
