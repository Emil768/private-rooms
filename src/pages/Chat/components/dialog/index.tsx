import { Dialog as DialogType } from '../../../../store/types/dialog';
import cls from './dialog.module.scss';
import { AppLink } from '../../../../components/AppLink';
import { Avatar } from '../../../../components/Avatar';
import { memo } from 'react';

interface DialogProps {
	dialog: DialogType;
	activeDialog: boolean;
	length: string;
	className?: string;
}

export const Dialog = memo(({ dialog: { username, id, onlineStatus }, activeDialog, className }: DialogProps) => {
	return (
		<AppLink to={id} className={[cls.Dialog, className, activeDialog ? cls.active : ''].join(' ').trim()}>
			<div className={cls.info}>
				<Avatar username={username} />
				<div className={cls.name}>{username}</div>
				<span className={[cls.status, onlineStatus === 1 ? cls.green : cls.grey].join(' ')} />
			</div>
			{/* {length && <span className={cls.count}>{length}</span>} */}
		</AppLink>
	);
});
