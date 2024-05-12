import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtraThunkProps } from '../../types/store';
import { toast } from 'react-toastify';
import { UserContactsResponseState } from '../../types/chat';
import { AxiosError } from 'axios';

export const fetchUserGetContacts = createAsyncThunk<UserContactsResponseState, null, ExtraThunkProps<string>>(
	'chat/fetchUserGetContacts',
	async (_, { extra, rejectWithValue }) => {
		try {
			const response = await extra.api.get<UserContactsResponseState>('/Contacts/All');

			return response.data;
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
