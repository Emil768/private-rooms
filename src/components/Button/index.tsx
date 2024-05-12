import React, { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import cls from './Button.module.scss';
import { Loader } from '../Loader';

export enum ButtonTheme {
	'CLEAR' = 'clear',
	'DEFAULT' = 'default',
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	children: ReactNode;
	isLoading?: boolean;
	theme?: ButtonTheme;
}

export const Button = memo(
	({
		className,
		isLoading,
		value,
		type,
		onClick,
		children,
		theme = ButtonTheme.DEFAULT,
		...otherProps
	}: ButtonProps) => {
		return (
			<button
				className={[cls.Button, cls[theme], className].join(' ').trim()}
				type={type}
				value={value}
				onClick={onClick}
				{...otherProps}
			>
				{isLoading ? <Loader /> : <span>{children}</span>}
			</button>
		);
	},
);
