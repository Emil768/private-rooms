import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import cls from './Input.module.scss';
import { Text, TextSize, TextTheme } from '../Text';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
	className?: string;
	value: string;
	type?: string;
	onChange: (value: string) => void;
	error?: string;
}

export const Input = ({ className, error, value, type = 'text', onChange, ...otherProps }: InputProps) => {
	const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<div>
			<input
				type={type}
				value={value}
				onChange={onChangeValue}
				{...otherProps}
				className={[cls.Input, error && cls.error, className].join(' ').trim()}
			/>
			{error && <Text text={error} size={TextSize.TINY} theme={TextTheme.ERROR} />}
		</div>
	);
};
