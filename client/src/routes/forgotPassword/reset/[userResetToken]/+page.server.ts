import { z } from 'zod';
import { fail, type Actions } from '@sveltejs/kit';
import type Message from '../../../login/interface/message.interface.js';
import { createDefaultMessage } from '../../../login/interface/message.interface.js';
import { ResponseMessage } from '../../../../libs/message/responseMessage.enum.js';

let message: Message;

const ResetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, ResponseMessage.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS)
			.max(50, ResponseMessage.PASSWORD_TOO_LONG),
		confirmPassword: z
			.string()
			.min(8, ResponseMessage.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS)
			.max(50, ResponseMessage.CONFIRM_PASSWORD_TOO_LONG)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: ResponseMessage.CONFIRM_PASSWORD_MUST_MATCH_PASSWORD,
		path: ['confirmPassword']
	});

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
