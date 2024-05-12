import { AppLink } from '../../components/AppLink';
import { Text, TextSize } from '../../components/Text';
import cls from './NotFound.module.scss';

export const NotFoundPage = () => {
	return (
		<div className={cls.NotFoundPage}>
			<div>
				<Text className={cls.title} text="Страница не найдена!" size={TextSize.LARGE} />
				<AppLink className={cls.link} to={'/'}>
					Вернуться на главную
				</AppLink>
			</div>
		</div>
	);
};
