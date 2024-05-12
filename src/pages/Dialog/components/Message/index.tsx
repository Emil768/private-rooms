import { memo } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { getAuthDataSelector } from '../../../../store/selectors/login';
import { MessageReceivedState } from '../../../../store/types/dialog';
import cls from './Message.module.scss';

interface MessageProps {
	message: MessageReceivedState;
}

export const Message = memo(({ message }: MessageProps) => {
	const userData = useAppSelector(getAuthDataSelector);

	return (
		<div className={[cls.Message, message.senderId === userData.user?.id ? cls.green : ''].join(' ')}>
			{message.content}
		</div>
	);
});
