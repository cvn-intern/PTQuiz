import { t } from '$i18n/translations';
import { AuthError, JwtError, UserError } from '../message/responseMessage.enum';

export const translateValidation = (message: string) => {
	if (message === AuthError.USER_NOT_ACTIVATED) {
		return t.get('validation.USER_NOT_ACTIVATED');
	} else if (message === AuthError.USER_INVALID_CREDENTIALS) {
		return t.get('validation.USER_INVALID_CREDENTIALS');
	} else if (message === AuthError.USER_ALREADY_ACTIVATED) {
		return t.get('validation.USER_ALREADY_ACTIVATED');
	} else if (message === AuthError.USER_EMAIL_NOT_FOUND) {
		return t.get('validation.USER_EMAIL_NOT_FOUND');
	} else if (message === AuthError.USER_PASSWORDS_NOT_MATCH) {
		return t.get('validation.USER_PASSWORDS_NOT_MATCH');
	} else if (message === AuthError.USER_NOT_FOUND) {
		return t.get('validation.USER_NOT_FOUND');
	} else if (message === AuthError.USER_OAUTH_CHANGE_PASSWORD) {
		return t.get('validation.USER_OAUTH_CHANGE_PASSWORD');
	} else if (message === AuthError.USER_OAUTH_LOGIN) {
		return t.get('validation.USER_OAUTH_LOGIN');
	} else if (message === AuthError.USER_OLD_PASSWORD_INVALID) {
		return t.get('validation.USER_OLD_PASSWORD_INVALID');
	} else if (message === AuthError.USER_BLOCKED) {
		return t.get('validation.USER_BLOCKED');
	} else if (message === AuthError.USER_ALREADY_ACTIVATED_LOGIN) {
		return t.get('validation.USER_ALREADY_ACTIVATED_LOGIN');
	} else if (message === AuthError.USER_LOGIN_INACTIVE_ACCOUNT) {
		return t.get('validation.USER_LOGIN_INACTIVE_ACCOUNT');
	} else if (message === JwtError.INVALID_TOKEN) {
		return t.get('validation.INVALID_TOKEN');
	} else if (message === JwtError.EXPIRED_TOKEN) {
		return t.get('validation.EXPIRED_TOKEN');
	} else if (message === JwtError.ACCESS_TOKEN_EXPIRED) {
		return t.get('validation.ACCESS_TOKEN_EXPIRED');
	} else if (message.includes('attempts left')) {
		const positionOfAttemptsLeft = 4;
		const attemptsLeft = message.split(' ')[positionOfAttemptsLeft];
		return t.get('validation.USER_INVALID_CREDENTIALS_ATTEMPTS_LEFT', { attemptsLeft });
	} else if (message === UserError.DISPLAY_NAME_CANNOT_BE_EMPTY) {
		return t.get('validation.MISSING_DISPLAY_NAME');
	} else if (message === UserError.FILE_TOO_LARGE) {
		return t.get('validation.AVATAR_MUST_BE_LESS_THAN_5MB');
	} 
};
