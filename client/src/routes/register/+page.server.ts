import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type Message from '../login/interface/message.interface';
import { createDefaultMessage } from '../login/interface/message.interface';
import { ResponseMessage as MESSAGE } from '../../libs/message/responseMessage.enum';

const RegistrationFormSchema = z
	.object({
		displayName: z
			.string()
			.min(3, MESSAGE.DISPLAY_NAME_MUST_BE_AT_LEAST_3_CHARACTERS)
			.max(50, MESSAGE.DISPLAY_NAME_TOO_LONG),
		email: z.string().email(MESSAGE.INVALID_EMAIL),
		password: z
			.string()
			.min(8, MESSAGE.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS)
			.max(50, MESSAGE.PASSWORD_TOO_LONG),
		confirmPassword: z
			.string()
			.min(8, MESSAGE.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS)
			.max(50, MESSAGE.PASSWORD_TOO_LONG)
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: MESSAGE.CONFIRM_PASSWORD_MUST_MATCH_PASSWORD,
		path: ['confirmPassword']
	});

let message: Message;

export const actions = {
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
				message.error.message = result.message;

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
