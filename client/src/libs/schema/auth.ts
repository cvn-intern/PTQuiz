import { z } from 'zod';
import { t } from '$i18n/translations';

const LoginFormSchema = z.object({
	email: z.string().email(t.get('validation.INVALID_EMAIL')),
	password: z
		.string()
		.min(8, t.get('validation.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS'))
		.max(50, t.get('validation.PASSWORD_TOO_LONG'))
});

const RegistrationFormSchema = z
	.object({
		displayName: z
			.string()
			.min(3, t.get('validation.DISPLAY_NAME_MUST_BE_AT_LEAST_3_CHARACTERS'))
			.max(50, t.get('validation.DISPLAY_NAME_TOO_LONG')),
		email: z.string().email(t.get('validation.INVALID_EMAIL')),
		password: z
			.string()
			.min(8, t.get('validation.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS'))
			.max(50, t.get('validation.PASSWORD_TOO_LONG')),
		confirmPassword: z
			.string()
			.min(8, t.get('validation.CONFIRM_PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS'))
			.max(50, t.get('validation.CONFIRM_PASSWORD_TOO_LONG'))
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: t.get('validation.CONFIRM_PASSWORD_MUST_MATCH_PASSWORD'),
		path: ['confirmPassword']
	});

const ForgotPasswordSchema = z.object({
	email: z.string().email(t.get('INVALID_EMAIL'))
});

const ResetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, t.get('validation.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS'))
			.max(50, t.get('validation.PASSWORD_TOO_LONG')),
		confirmPassword: z
			.string()
			.min(8, t.get('validation.CONFIRM_PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS'))
			.max(50, t.get('validation.CONFIRM_PASSWORD_TOO_LONG'))
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: t.get('validation.CONFIRM_PASSWORD_MUST_MATCH_PASSWORD'),
		path: ['confirmPassword']
	});

export { LoginFormSchema, RegistrationFormSchema, ForgotPasswordSchema, ResetPasswordSchema };
