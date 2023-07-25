import { fail, type Actions } from '@sveltejs/kit';
import type Message from './interface/message.interface';
import { createDefaultMessage } from './interface/message.interface';
import { ResponseMessage as MESSAGE } from '../../libs/message/responseMessage.enum';
import { LoginFormSchema } from '../../libs/schema/index';

let message: Message;

export const actions: Actions = {
	login: async ({ fetch, request }) => {
		message = createDefaultMessage();
		const data = await request.formData();

		try {
			const validatedData = LoginFormSchema.parse({
				email: data.get('email'),
				password: data.get('password')
			});

			const response = await fetch('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify(validatedData)
			});

			const result = await response.json();
			message.isDone = true;

			if (response.status === 200) {
				message.isSuccess = true;
				message.success.message = result;
			} else {
				message.isSuccess = false;
				message.error.missing.default = true;
				message.error.message = result;

				if (result === MESSAGE.EMAIL_NOT_CONFIRMED) {
					message.error.missing.confirmEmail = true;
					message.error.fill.email = data.get('email') as string;
				}
			}
		} catch (err: any) {
			message.isSuccess = false;
			message.isDone = true;
			message.error.missing.default = true;
			message.error.message = err.errors[0].message;
		}

		return message.isSuccess ? message : fail(400, { ...message });
	}
};
