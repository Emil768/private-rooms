import { StoreSchema } from '../types/store';

export const getAuthDataSelector = (state: StoreSchema) => state?.auth.data;

export const getCurrentUserSelector = (state: StoreSchema) => state?.auth.data?.user;

export const getAuthDataErrorSelector = (state: StoreSchema) => state?.auth.error;

export const getIsAuthDataLoadingSelector = (state: StoreSchema) => state?.auth.isLoading;
