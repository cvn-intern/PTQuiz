import { fail, redirect } from '@sveltejs/kit';
import type Message from '../login/interface/message.interface';
import { createDefaultMessage } from '../login/interface/message.interface';

let message: Message;

export const actions = {
	register: async ({ fetch, request }) => {
		const data = await request.formData();
		message = createDefaultMessage();

		if (!data.get('displayName') || data.get('displayName')?.trim().length === 0) {
			message.error.missing.displayName = true;
			message.error.message = "Display name can't be empty";
			return fail(400, { ...message });
		}

		if (data.get('displayName')?.trim().length < 3) {
			message.error.missing.displayName = true;
			message.error.message = 'Display name must be at least 3 characters';
			return fail(400, { ...message });
		}

		if (!data.get('email') || data.get('email')?.trim().length === 0) {
			message.error.missing.email = true;
			message.error.message = "Email can't be empty";
			return fail(400, { ...message });
		}

		// use regex to validate email
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
		if (!emailRegex.test(data.get('email') as string)) {
			message.error.missing.email = true;
			message.error.message = 'Invalid email';
			return fail(400, { ...message });
		}

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

		if (!data.get('confirmPassword') || data.get('confirmPassword')?.trim().length === 0) {
			message.error.missing.confirmPassword = true;
			message.error.message = "Confirm password can't be empty";
			return fail(400, { ...message });
		}

		if (data.get('confirmPassword') !== data.get('password')) {
			message.error.missing.confirmPassword = true;
			message.error.message = 'Confirm password must match password';
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
			throw redirect(303, '/register/loading');
		} else {
			message.error.missing.default = true;
			message.error.message = result;
			return fail(400, { ...message });
		}
	}
};
