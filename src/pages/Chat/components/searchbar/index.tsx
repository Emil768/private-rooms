import React, { useCallback } from 'react';
import { Input, InputTheme } from '../../../../components/Input';
import MenuIcon from '../../../../assets/icons/menu.svg?react';
import { Button, ButtonTheme } from '../../../../components/Button';
import cls from './searchbar.module.scss';
import { useDebounce } from '../../../../hooks/useDebounce';
import { fetchUserSearchData } from '../../../../store/actions/chat/fetchUserSearchData';
import { chatActions } from '../../../../store/slices/chat';
import { getChatSearchSelector } from '../../../../store/selectors/chat';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';

export const SearchBar = () => {
	const search = useAppSelector(getChatSearchSelector);
	const dispatch = useAppDispatch();

	const fetchData = useCallback(() => {
		dispatch(fetchUserSearchData(null));
	}, [dispatch]);

	const debounceFetchData = useDebounce(fetchData, 500);

	const onSearchUserChange = useCallback(
		(value: string) => {
			dispatch(chatActions.setSearchValue(value));
			debounceFetchData();
		},
		[dispatch, debounceFetchData],
	);

	return (
		<div className={cls.SearchBar}>
			<Button theme={ButtonTheme.CLEAR}>
				<MenuIcon />
			</Button>
			<Input value={search} onChange={onSearchUserChange} placeholder="Search" theme={InputTheme.SEARCH} />
		</div>
	);
};
