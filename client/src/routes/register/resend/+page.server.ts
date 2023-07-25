import { z } from 'zod';
import { fail, Actions } from '@sveltejs/kit';
import type Message from '../../login/interface/message.interface.js';
import { createDefaultMessage } from '../../login/interface/message.interface.js';
import { ResponseMessage } from '../../../libs/message/responseMessage.enum.js';

let message: Message;

const ResendSchema = z.object({
	email: z.string().email()
});

export const actions: Actions = {
	resend: async ({ fetch, request }) => {
		message = createDefaultMessage();

		const data = await request.formData();
		const email = data.get('email');

		try {
			const parsedData = ResendSchema.parse({ email });

			const response = await fetch('/api/auth/resend', {
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
				message.error.message = result;
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
