import TelegramLoaderIcon from '../../assets/icons/telegram-loader.gif';
import { AppLink } from '../../components/AppLink';
import cls from './Main.module.scss';

export const MainPage = () => {
	return (
		<div className={cls.Main}>
			<div>Main page</div>
			<h2 className={cls.title}>На странице ведутся работы!</h2>
			<AppLink to={'/chat'}>Просьба перейти на рабочий экран 👇</AppLink>
			<img src={TelegramLoaderIcon} />
		</div>
	);
};
