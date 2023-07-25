import { fail, type Actions } from '@sveltejs/kit';
import type Message from '../login/interface/message.interface';
import { createDefaultMessage } from '../login/interface/message.interface';
import { ResponseMessage as MESSAGE } from '../../libs/message/responseMessage.enum';
import { RegistrationFormSchema } from '../../libs/schema/index';

let message: Message;

export const actions: Actions = {
	register: async ({ fetch, request }) => {
		const data = await request.formData();
		message = createDefaultMessage();

		try {
			const validatedData = RegistrationFormSchema.parse({
				displayName: data.get('displayName'),
				email: data.get('email'),
				password: data.get('password'),
				confirmPassword: data.get('confirmPassword')
			});

			const response = await fetch('/api/auth/register', {
				method: 'POST',
				body: JSON.stringify(validatedData)
			});
			const result = await response.json();

			message.isDone = true;

			if (response.status === 201) {
				message.isSuccess = true;
				message.success.message = result;
			} else {
				message.isSuccess = false;
				message.error.missing.default = true;
				message.error.message = result;

				if (result.message === MESSAGE.EMAIL_NOT_CONFIRMED) {
					message.error.missing.confirmEmail = true;
				}
			}
		} catch (err: any) {
			message.isSuccess = false;
			message.isDone = true;
			(message.error.missing as Record<string, boolean>)[`${err.errors[0].path}`] = true;
			message.error.message = err.errors[0].message;
		}

		return message.isSuccess ? message : fail(400, { ...message });
	}
};
