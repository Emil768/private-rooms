import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchUserGetData } from '../../actions/dialog/fetchUserGetData';
import { Dialog, DialogState } from '../../types/dialog';
import { fetchAddUserContact } from '../../actions/dialog/fetchAddUserContact';

const initialState: DialogState = {
	user: undefined,
	dialogs: undefined,
	messageText: '',
	isLoading: false,
	error: undefined,
	isFriend: false,
};
export const dialogSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		setUserDialog: (state, action) => {
			state.dialogs = action.payload;
		},
		setMessageText: (state, action: PayloadAction<string>) => {
			state.messageText = action.payload;
		},
		resetState: (state) => {
			state.user = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			// Получение юзера
			.addCase(fetchUserGetData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchUserGetData.fulfilled, (state, action: PayloadAction<Dialog>) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(fetchUserGetData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			// Добавить контакты
			.addCase(fetchAddUserContact.pending, (state) => {
				state.isLoading = true;
			})
			// TODO: Ждем бэк
			.addCase(fetchAddUserContact.fulfilled, (state, action: PayloadAction<boolean>) => {
				state.isLoading = false;
				state.isFriend = action.payload;
			})
			.addCase(fetchAddUserContact.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});

		// Отрпавить сообщение
		// .addCase(fetchSendUserMessage.pending, (state) => {
		// 	state.isLoading = true;
		// })
		// .addCase(fetchSendUserMessage.fulfilled, (state, action: PayloadAction<string>) => {
		// 	state.isLoading = false;

		// 	const dialogs = JSON.parse(localStorage.getItem('dialogs'));

		// 	localStorage.setItem('dialogs', JSON.stringify([...dialogs, { [action.payload]: {} }]));
		// })
		// .addCase(fetchSendUserMessage.rejected, (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload;
		// });
	},
});

export const { actions: dialogActions } = dialogSlice;
export const { reducer: dialogReducer } = dialogSlice;
