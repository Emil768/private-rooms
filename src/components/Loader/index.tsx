import React from 'react';
import cls from './Loader.module.scss';

interface LoaderProps {
	className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
	return <div className={[cls.Loader, className].join(' ').trim()}></div>;
};
