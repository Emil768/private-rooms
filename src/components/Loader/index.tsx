import React from 'react';
import cls from './Loader.module.scss';

export enum LoaderTheme {
	'DEFAULT' = 'default',
}

interface LoaderProps {
	className?: string;
	theme?: LoaderTheme;
}

export const Loader = ({ className, theme }: LoaderProps) => {
	return <div className={[cls.Loader, theme ? cls[theme] : '', className].join(' ').trim()}></div>;
};
