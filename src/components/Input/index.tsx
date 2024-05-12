import React, { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';
import { Text, TextSize, TextTheme } from '../Text';

export enum InputTheme {
	'CIRCLE' = 'circle',
	'SEARCH' = 'search',
}

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
	className?: string;
	value: string;
	type?: string;
	onChange: (value: string) => void;
	error?: string;
	theme?: InputTheme;
}

export const Input = memo(
	({ className, error, value, type = 'text', onChange, theme = InputTheme.CIRCLE, ...otherProps }: InputProps) => {
		const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
			onChange(e.target.value);
		};

		return (
			<div className={cls.wrapper}>
				<input
					type={type}
					value={value}
					onChange={onChangeValue}
					{...otherProps}
					className={[cls.Input, cls[theme], error && cls.error, className].join(' ').trim()}
				/>
				{error && <Text text={error} size={TextSize.TINY} theme={TextTheme.ERROR} />}
			</div>
		);
	},
);
