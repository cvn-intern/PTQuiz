import { z } from 'zod';
import { t } from '$i18n/translations';

const MAX_FILE_SIZE = 500000;

const ProfileFormSchema = z.object({
	displayName: z
		.string()
		.min(3, t.get('validation.DISPLAY_NAME_MUST_BE_AT_LEAST_3_CHARACTERS'))
		.max(20, t.get('validation.DISPLAY_NAME_TOO_LONG')),
	avatar: z
		.any()
		.optional()
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
});

const PasswordFormSchema = z
	.object({
		oldPassword: z
			.string()
			.min(8, t.get('validation.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS'))
			.max(20, t.get('validation.PASSWORD_TOO_LONG')),
		newPassword: z
			.string()
			.min(8, t.get('validation.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS'))
			.max(20, t.get('validation.PASSWORD_TOO_LONG')),
		confirmPassword: z
			.string()
			.min(8, t.get('validation.CONFIRM_PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS'))
			.max(20, t.get('validation.CONFIRM_PASSWORD_TOO_LONG'))
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: t.get('validation.CONFIRM_PASSWORD_MUST_MATCH_PASSWORD'),
		path: ['confirmPassword']
	});

export { ProfileFormSchema, PasswordFormSchema };
