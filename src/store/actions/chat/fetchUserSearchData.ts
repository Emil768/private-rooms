import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtraThunkProps } from '../../types/store';
import { getChatSearchSelector } from '../../selectors/chat';
import { toast } from 'react-toastify';
import { DialogResponseState } from '../../types/dialog';
import { AxiosError } from 'axios';
import { fetchUserGetContacts } from './fetchUserGetContacts';

export const fetchUserSearchData = createAsyncThunk<DialogResponseState | null, null, ExtraThunkProps<string>>(
	'chat/fetchUserSearchData',
	async (_, { extra, rejectWithValue, dispatch, getState }) => {
		try {
			const search = getChatSearchSelector(getState());

			if (search) {
				const response = await extra.api.post<DialogResponseState>('/Users/Search', {
					value: search,
				});

				return response.data;
			}
			dispatch(fetchUserGetContacts(null));

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
