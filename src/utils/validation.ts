import { UserAuthProps } from '../types/user';

export const validationErrorsAuth = (user: UserAuthProps) => {
	const errors: Partial<UserAuthProps> = {};

	if (!/^[a-zA-Z0-9]{0,}$/.test(user.username)) {
		errors.username = 'Латинские буквы и цифры';
	}

	if (user.username.length < 3) {
		errors.username = 'Минимум 3 символа';
	}

	if (user.password.length < 3) {
		errors.password = 'Минимум 3 символа';
	}

	return errors;
};
