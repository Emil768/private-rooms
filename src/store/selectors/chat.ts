import { StoreSchema } from '../types/store';

export const getChatSearchSelector = (state: StoreSchema) => state?.chat.search || '';

export const getChatDataErrorSelector = (state: StoreSchema) => state?.chat.error;

export const getIsLoadingChatDataSelector = (state: StoreSchema) => state?.chat.isLoading;

export const getChatUsersDataSelector = (state: StoreSchema) => state?.chat.users;

export const getContactsUsersDataSelector = (state: StoreSchema) => state?.chat.contacts;
