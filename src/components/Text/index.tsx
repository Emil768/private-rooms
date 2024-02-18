import { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
	ERROR = 'error',
}

export enum TextSize {
	LARGE = 'large',
	SMALL = 'small',
	TINY = 'tiny',
}

interface TextProps {
	className?: string;
	theme?: TextTheme;
	text: string;
	size: string;
}

export const Text = memo(({ className, size, theme, text }: TextProps) => {
	return (
		<div className={[cls.Text, cls[theme || ''], cls[size], className].join(' ').trim()}>
			<p className={cls.text}>{text}</p>
		</div>
	);
});
