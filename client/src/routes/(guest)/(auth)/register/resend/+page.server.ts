import { fail, type Actions } from '@sveltejs/kit';
import type Message from '../../login/interface/message.interface.js';
import { createDefaultMessage } from '../../login/interface/message.interface.js';
import { translateValidation } from '$helpers/translateValidation';
import { ForgotPasswordSchema } from '../../../../../libs/schema/auth.js';

let message: Message;

export const actions: Actions = {
	resend: async ({ fetch, request }) => {
		message = createDefaultMessage();

		const data = await request.formData();
		const email = data.get('email');

		try {
			const parsedData = ForgotPasswordSchema.parse({ email });

			const response = await fetch('/api/auth/resend', {
				method: 'POST',
				body: JSON.stringify({
					email: parsedData.email
				})
			});

			const result = await response.json();
			message.isDone = true;

			if (response.status === 200) {
				message.isSuccess = true;
				message.success.message = result;
				return message;
			} else {
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
