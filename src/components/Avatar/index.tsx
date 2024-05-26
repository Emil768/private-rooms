import { memo } from 'react';
import cls from './Avatar.module.scss';
import { ALPHABET_COLORS } from '../../consts/alphabet';
import { Loader, LoaderTheme } from '../Loader';

interface AvatarProps {
	className?: string;
	username: string;
	isLoading?: boolean;
}

export const Avatar = memo(({ username, className, isLoading }: AvatarProps) => {
	return (
		<div
			className={[cls.Avatar, className].join(' ').trim()}
			style={{
				backgroundColor: ALPHABET_COLORS[username.charAt(0).toUpperCase()],
			}}
		>
			{isLoading ? <Loader theme={LoaderTheme.DEFAULT} /> : username.charAt(0).toUpperCase()}
		</div>
	);
});
