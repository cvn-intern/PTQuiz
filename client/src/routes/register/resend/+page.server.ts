import { fail, type Actions } from '@sveltejs/kit';
import type Message from '../../login/interface/message.interface.js';
import { createDefaultMessage } from '../../login/interface/message.interface.js';
import { ResponseMessage } from '../../../libs/message/responseMessage.enum.js';
let message: Message;

export const actions: Actions = {
	resend: async ({ fetch, request }) => {
		message = createDefaultMessage();

		const data = await request.formData();
		if (!String(data.get('email')) || String(data.get('email'))?.trim().length === 0) {
			message.isDone = true;
			message.error.missing.email = true;
			message.error.message = ResponseMessage.MISSING_EMAIL;
			return fail(400, { ...message });
		}

		// use regex to validate email
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
		if (!emailRegex.test(data.get('email') as string)) {
			message.isDone = true;
			message.error.missing.email = true;
			message.error.message = ResponseMessage.INVALID_EMAIL;
			return fail(400, { ...message });
		}

		const response = await fetch('/api/auth/resend', {
			method: 'POST',
			body: JSON.stringify({
				email: data.get('email')
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
			message.error.message = result;
			return fail(400, { ...message });
		}
	}
};
