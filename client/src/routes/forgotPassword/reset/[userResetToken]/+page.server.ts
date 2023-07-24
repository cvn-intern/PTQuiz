import { fail, redirect, type Actions } from '@sveltejs/kit';
import type Message from '../../../login/interface/message.interface.js';
import { createDefaultMessage } from '../../../login/interface/message.interface.js';
import { ResponseMessage } from '../../../../libs/message/responseMessage.enum.js';

let message: Message;

export const actions: Actions = {
	reset: async ({ params, request, fetch }) => {
		message = createDefaultMessage();

		const { userResetToken } = params;
		const data = await request.formData();
		if (!String(data.get('password')) || String(data.get('password'))?.trim().length === 0) {
			message.isDone = true;
			message.error.missing.password = true;
			message.error.message = ResponseMessage.MISSING_PASSWORD;
			return fail(400, { ...message });
		}

		if (String(data.get('password'))?.trim().length < 8) {
			message.isDone = true;
			message.error.missing.password = true;
			message.error.message = ResponseMessage.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS;
			return fail(400, { ...message });
		}

		if (!String(data.get('confirmPassword')) || String(data.get('confirmPassword'))?.trim().length === 0) {
			message.isDone = true;
			message.error.missing.confirmPassword = true;
			message.error.message = ResponseMessage.MISSING_CONFIRM_PASSWORD;
			return fail(400, { ...message });
		}

		if (data.get('confirmPassword') !== data.get('password')) {
			message.isDone = true;
			message.error.missing.confirmPassword = true;
			message.error.message = ResponseMessage.CONFIRM_PASSWORD_MUST_MATCH_PASSWORD;
			return fail(400, { ...message });
		}

		const response = await fetch('/api/auth/reset', {
			method: 'POST',
			body: JSON.stringify({
				token: userResetToken,
				password: data.get('password'),
				confirmPassword: data.get('confirmPassword')
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
			message.error.message = result;
			return fail(400, { ...message });
		}
	}
};
