import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtraThunkProps } from '../../types/store';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { getContactsUsersDataSelector } from '../../selectors/chat';
import { chatActions } from '../../slices/chat';

export const fetchRemoveUserContact = createAsyncThunk<null, string, ExtraThunkProps<string>>(
	'dialog/fetchRemoveUserContact',
	async (userId, { extra, dispatch, getState, rejectWithValue }) => {
		try {
			const response = await extra.api.delete('/Contacts/Delete', {
				data: { userIds: [userId] },
			});

			if (response.status === 200) {
				toast.success('Контакт успешно удален', {
					autoClose: 1500,
					closeOnClick: true,
				});

				const contacts = getContactsUsersDataSelector(getState());

				const updateContacts = contacts.filter((contact) => contact.id !== userId);

				dispatch(chatActions.setContacts(updateContacts));
			}
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
