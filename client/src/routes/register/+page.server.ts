import { fail, redirect } from '@sveltejs/kit';
import type Message from '../login/interface/message.interface';
import { createDefaultMessage } from '../login/interface/message.interface';
import { ResponseMessage as MESSAGE } from '../../libs/message/responseMessage.enum';

let message: Message;

export const actions = {
	register: async ({ fetch, request }) => {
		const data = await request.formData();
		message = createDefaultMessage();

		if (!data.get('displayName') || data.get('displayName')?.trim().length === 0) {
			message.isDone = true;
			message.error.missing.displayName = true;
			message.error.message = MESSAGE.MISSING_DISPLAY_NAME;
			return fail(400, { ...message });
		}

		if (data.get('displayName')?.trim().length < 3) {
			message.isDone = true;
			message.error.missing.displayName = true;
			message.error.message = MESSAGE.DISPLAY_NAME_MUST_BE_AT_LEAST_3_CHARACTERS;
			return fail(400, { ...message });
		}

		if (!data.get('email') || data.get('email')?.trim().length === 0) {
			message.isDone = true;
			message.error.missing.email = true;
			message.error.message = MESSAGE.MISSING_EMAIL;
			return fail(400, { ...message });
		}

		// use regex to validate email
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
		if (!emailRegex.test(data.get('email') as string)) {
			message.isDone = true;
			message.error.missing.email = true;
			message.error.message = MESSAGE.INVALID_EMAIL;
			return fail(400, { ...message });
		}

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

		if (!data.get('confirmPassword') || data.get('confirmPassword')?.trim().length === 0) {
			message.isDone = true;
			message.error.missing.confirmPassword = true;
			message.error.message = MESSAGE.MISSING_CONFIRM_PASSWORD;
			return fail(400, { ...message });
		}

		if (data.get('confirmPassword') !== data.get('password')) {
			message.isDone = true;
			message.error.missing.confirmPassword = true;
			message.error.message = MESSAGE.CONFIRM_PASSWORD_MUST_MATCH_PASSWORD;
			return fail(400, { ...message });
		}

		const response = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				displayName: data.get('displayName'),
				email: data.get('email'),
				password: data.get('password'),
				confirmPassword: data.get('confirmPassword')
			})
		});
		const result = await response.json();
		if (response.status === 201) {
			message.isDone = true;
			message.isSuccess = true;
			message.success.message = result;
			return message;
		} else if (result.message === MESSAGE.EMAIL_NOT_CONFIRMED) {
			message.isDone = true;
			message.error.missing.confirmEmail = true;
			message.error.message = result.message;
			return fail(400, { ...message });
		} else {
			message.error.missing.default = true;
			message.error.message = result;
			message.isDone = true;
			return fail(400, { ...message });
		}
	}
};
