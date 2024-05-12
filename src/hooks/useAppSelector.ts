import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { StoreSchema } from '../store/types/store';

export const useAppSelector: TypedUseSelectorHook<StoreSchema> = useSelector;
