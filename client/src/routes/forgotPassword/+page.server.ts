import { translateValidation } from '$helpers/translateValidation';
import { fail, type Actions } from '@sveltejs/kit';
import type Message from '../login/interface/message.interface.js';
import { createDefaultMessage } from '../login/interface/message.interface.js';
import { ForgotPasswordSchema } from '../../libs/schema/index';

let message: Message;

export const actions: Actions = {
	forgotPassword: async ({ fetch, request }) => {
		message = createDefaultMessage();

		const data = await request.formData();
		const email = data.get('email');

		try {
			const parsedData = ForgotPasswordSchema.parse({ email });

			const response = await fetch('/api/auth/forgotPassword', {
				method: 'POST',
				body: JSON.stringify({
					email: parsedData.email
				})
			});

			const result = await response.json();
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
