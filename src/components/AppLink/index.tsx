import { Link, LinkProps } from 'react-router-dom';
import { memo } from 'react';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
	RED = 'red',
}

interface AppLinkProps extends LinkProps {
	className?: string;
	theme?: AppLinkTheme;
}

export const AppLink = memo((props: AppLinkProps) => {
	const { to, className, children, theme = AppLinkTheme.PRIMARY, ...otherProps } = props;

	return (
		<Link to={to} className={[cls[theme], className].join(' ').trim()} {...otherProps}>
			{children}
		</Link>
	);
});