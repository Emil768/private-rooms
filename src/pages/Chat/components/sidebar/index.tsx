import React, { memo } from 'react';
import { SearchBar } from '../searchbar';
import { Dialogs } from '../dialogs';
import cls from './sidebar.module.scss';

export interface SidebarProps {
	className?: string;
}

export const SideBar = memo(({ className }: SidebarProps) => {
	return (
		<div className={[cls.SideBar, className].join(' ').trim()}>
			<SearchBar />
			<Dialogs />
		</div>
	);
});
