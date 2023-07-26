import { translateValidation } from '$helpers/translateValidation';
import { fail, type Actions } from '@sveltejs/kit';
import type Message from '../../../login/interface/message.interface.js';
import { createDefaultMessage } from '../../../login/interface/message.interface.js';
import { ResetPasswordSchema } from '../../../../../../libs/schema/auth.js';
let message: Message;

export const actions: Actions = {
	reset: async ({ params, request, fetch }) => {
		message = createDefaultMessage();

		const { userResetToken } = params;
		const data = await request.formData();

		try {
			const parsedData = ResetPasswordSchema.parse({
				password: data.get('password'),
				confirmPassword: data.get('confirmPassword')
			});

			const response = await fetch('/api/auth/reset', {
				method: 'POST',
				body: JSON.stringify({
					token: userResetToken,
					password: parsedData.password,
					confirmPassword: parsedData.confirmPassword
				})
			});

			const result = await response.json();
			message.isDone = true;

			if (response.status === 200) {
				message.isDone = true;
				message.isSuccess = true;
				message.success.message = result;
				return message;
			} else {
				message.isDone = true;
				message.isSuccess = false;
				message.error.missing.default = true;
				const i18nTranslate = translateValidation(result);
				message.error.message = i18nTranslate;
				return fail(400, { ...message });
			}
		} catch (err: any) {
			message.isDone = true;
			(message.error.missing as Record<string, boolean>)[`${err.errors[0].path}`] = true;
			message.error.message = err.errors[0].message;
			return fail(400, { ...message });
		}
	}
};
