import { fail, redirect } from '@sveltejs/kit';
import type Message from './interface/message.interface';
import { createDefaultMessage } from './interface/message.interface';

let message: Message;

export const actions = {
	login: async ({ fetch, request }) => {
		message = createDefaultMessage();
		const data = await request.formData();

		if (!data.get('email') || data.get('email')?.trim().length === 0) {
			message.error.missing.email = true;
			message.error.message = "Email can't be empty";
			return fail(400, { ...message });
		}

		// use regex to validate email
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
		console.log(emailRegex.test(data.get('email') as string));

		if (!emailRegex.test(data.get('email') as string)) {
			console.log('invalid email');
			message.error.missing.email = true;
			message.error.message = 'Invalid email';
			return fail(400, { ...message });
		}

		if (!data.get('email'))
			if (!data.get('password') || data.get('password')?.trim().length === 0) {
				message.error.missing.password = true;
				message.error.message = "Password can't be empty";
				return fail(400, { ...message });
			}

		if (data.get('password')?.trim().length < 8) {
			message.error.missing.password = true;
			message.error.message = 'Password must be at least 8 characters';
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

		if (response.status === 200) {
			throw redirect(303, '/');
		} else {
			message.error.missing.default = true;
			message.error.message = result;
			return fail(400, { ...message });
		}
	}
};
