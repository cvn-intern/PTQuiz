import { fail, type Actions } from '@sveltejs/kit';
import type Message from './interface/message.interface';
import { createDefaultMessage } from './interface/message.interface';
import { ResponseMessage as MESSAGE } from '../../../../../libs/message/responseMessage.enum';
import { PasswordFormSchema, ProfileFormSchema } from '../../../../../libs/schema';
import { translateValidation } from '$helpers/translateValidation';

let message: Message;

export const actions: Actions = {
	edit_profile: async ({ request, fetch }) => {
		message = createDefaultMessage();
		const form = await request.formData();

		try {
			const validatedData = ProfileFormSchema.parse({
				displayName: form.get('displayName'),
				avatar: form.get('avatar')
			});

			const response = await fetch('/api/auth/edit-profile', {
				method: 'POST',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				body: form
			});

			const result = await response.json();
			message.isSuccess = result.statusCode === 200;
			message.success.message = result.message;
			const i18nTranslate = translateValidation(result.message);
			message.error.message = i18nTranslate;
		} catch (err: any) {
			message.isSuccess = false;
			(message.error.missing as Record<string, boolean>)[`${err.errors[0].path}`] = true;
			message.error.message = err.errors[0].message;
		}

		message.isDone = true;
		message.tabs.edit_profile = true;

		return message.isSuccess ? message : fail(400, { ...message });
	},
	change_password: async ({ request, fetch }) => {
		message = createDefaultMessage();
		const form = await request.formData();

		try {
			const validatedData = PasswordFormSchema.parse({
				oldPassword: form.get('oldPassword'),
				newPassword: form.get('newPassword'),
				confirmPassword: form.get('confirmPassword')
			});

			if (validatedData.newPassword !== validatedData.confirmPassword) {
				message.isDone = true;
				message.error.message = MESSAGE.CONFIRM_PASSWORD_MUST_MATCH_PASSWORD;
				throw new Error(message.error.message);
			}

			const response = await fetch('/api/auth/change-password', {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(validatedData)
			});

			const result = await response.json();
			message.isSuccess = result.statusCode === 200;
			message.success.message = result.message;
			const i18nTranslate = translateValidation(result.message);
			message.error.message = i18nTranslate;
		} catch (err: any) {
			message.isSuccess = false;
			(message.error.missing as Record<string, boolean>)[`${err.errors[0].path}`] = true;
			message.error.message = err.errors[0].message;
		}

		message.isDone = true;
		message.tabs.change_password = true;

		return message.isSuccess ? message : fail(400, { ...message });
	}
};
