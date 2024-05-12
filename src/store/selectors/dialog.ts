import { StoreSchema } from '../types/store';

export const getDialogDataErrorSelector = (state: StoreSchema) => state?.dialog.error;

export const getIsLoadingDialogDataSelector = (state: StoreSchema) => state?.dialog.isLoading;

export const getDialogUserDataSelector = (state: StoreSchema) => state?.dialog.user;

export const getIsContactExistingSelector = (state: StoreSchema) => {
	return Boolean(state.chat.contacts.find((user) => user.id === state.dialog.user?.id));
};

export const getUserDialogsSelector = (state: StoreSchema) => state?.dialog.dialogs;

export const getDialogMessageTextSelector = (state: StoreSchema) => state?.dialog.messageText;
