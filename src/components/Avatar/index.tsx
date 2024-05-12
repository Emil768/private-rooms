import { memo } from 'react';
import cls from './Avatar.module.scss';
import { ALPHABET_COLORS } from '../../consts/alphabet';

interface AvatarProps {
	className?: string;
	username: string;
}

export const Avatar = memo(({ username, className }: AvatarProps) => {
	return (
		<div
			className={[cls.Avatar, className].join(' ').trim()}
			style={{
				backgroundColor: ALPHABET_COLORS[username.charAt(0).toUpperCase()],
			}}
		>
			{username.charAt(0).toUpperCase()}
		</div>
	);
});
