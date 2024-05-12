import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtraThunkProps } from '../../types/store';
import { toast } from 'react-toastify';
import { SendMessageReponseState } from '../../types/dialog';
import { AxiosError } from 'axios';

export const fetchSendUserMessage = createAsyncThunk<null, SendMessageReponseState, ExtraThunkProps<string>>(
	'dialog/fetchSendUserMessage',
	async (message, { extra, rejectWithValue }) => {
		try {
			const response = await extra.api.post('/Messages/Send', { ...message });

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
