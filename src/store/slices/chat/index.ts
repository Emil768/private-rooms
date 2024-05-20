import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ChatState, UserContactsResponseState } from '../../types/chat';
import { fetchUserSearchData } from '../../actions/chat/fetchUserSearchData';
import { fetchUserGetContacts } from '../../actions/chat/fetchUserGetContacts';
import { Dialog } from '../../types/dialog';

const initialState: ChatState = {
	search: '',
	isLoading: false,
	error: undefined,
	users: [],
	contacts: [],
};
export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setContacts: (state, action: PayloadAction<Dialog[]>) => {
			state.contacts = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Поиск пользователей
			.addCase(fetchUserSearchData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUserSearchData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.users = action.payload?.users;
			})
			.addCase(fetchUserSearchData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			// Получение контактов
			.addCase(fetchUserGetContacts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUserGetContacts.fulfilled, (state, action: PayloadAction<UserContactsResponseState>) => {
				state.isLoading = false;
				state.contacts = action.payload.contacts;
			})
			.addCase(fetchUserGetContacts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { actions: chatActions } = chatSlice;
export const { reducer: chatReducer } = chatSlice;
