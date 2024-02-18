import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import cls from './Button.module.scss';
import { Loader } from '../Loader';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> {
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	children: ReactNode;
	isLoading?: boolean;
}

export const Button = ({ className, isLoading, value, type, onClick, children, ...otherProps }: ButtonProps) => {
	return (
		<button
			className={[cls.Button, className].join(' ').trim()}
			type={type}
			value={value}
			onClick={onClick}
			{...otherProps}
		>
			{isLoading ? <Loader /> : <span>{children}</span>}
		</button>
	);
};
