import { fail, redirect } from '@sveltejs/kit';
import type Message from './interface/message.interface';
import { createDefaultMessage } from './interface/message.interface';
import { ResponseMessage as MESSAGE } from '../../libs/message/responseMessage.enum';

let message: Message;

export const actions = {
	login: async ({ fetch, request }) => {
		message = createDefaultMessage();
		const data = await request.formData();

		if (!data.get('email') || data.get('email')?.trim().length === 0) {
			message.isDone = true;
			message.error.missing.email = true;
			message.error.message = MESSAGE.MISSING_EMAIL;
			return fail(400, { ...message });
		}

		// use regex to validate email
		const emailRegex = /^\S+@\S+\.\S+$/;

		if (!emailRegex.test(data.get('email') as string)) {
			message.isDone = true;
			message.error.missing.email = true;
			message.error.message = MESSAGE.INVALID_EMAIL;
			return fail(400, { ...message });
		}

		if (!data.get('email'))
			if (!data.get('password') || data.get('password')?.trim().length === 0) {
				message.isDone = true;
				message.error.missing.password = true;
				message.error.message = MESSAGE.MISSING_PASSWORD;
				return fail(400, { ...message });
			}

		if (data.get('password')?.trim().length < 8) {
			message.isDone = true;
			message.error.missing.password = true;
			message.error.message = MESSAGE.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS;
			return fail(400, { ...message });
		}

		const response = await fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				email: data.get('email'),
				password: data.get('password')
			})
		});
		const result = await response.json();
		message.isDone = true;

		if (response.status === 200) {
			message.isDone = true;
			message.isSuccess = true;
			message.success.message = result;
			return message;
		} else if (result === MESSAGE.EMAIL_NOT_CONFIRMED) {
			message.isDone = true;
			message.error.missing.confirmEmail = true;
			message.error.missing.default = true;
			message.error.message = result;
			message.error.fill.email = data.get('email') as string;
			return fail(400, { ...message });
		} else {
			message.isDone = true;
			message.isSuccess = false;
			message.error.missing.default = true;
			message.error.message = result;
			return fail(400, { ...message });
		}
	}
};
