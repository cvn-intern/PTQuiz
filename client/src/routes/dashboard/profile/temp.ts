import { fail, type Actions, json } from '@sveltejs/kit';
import type Message from './interface/message.interface';
import { createDefaultMessage } from './interface/message.interface';

let message: Message;

export const actions: Actions = {
	edit_profile: async ({ request, fetch }) => {
		message = createDefaultMessage();
		const form = await request.formData();
		const displayName = form.get('displayName');
		const avatar = form.get('avatar');

		message.tabs.profile = true;

		if (!displayName || displayName.trim().length === 0) {
			message.error.missing.displayName = true;
			message.error.message = "Display name can't be empty";
			return fail(400, { message });
		}

		if (displayName.length < 8) {
			message.error.missing.displayName = true;
			message.error.message = 'Display name must be at least 8 characters long';
			return fail(400, { ...message });
		}

		if (avatar && avatar.size > 4 * 1024 * 1024) {
			message.error.message = 'Avatar must be less than 4MB';
			return fail(400, { ...message });
		}

		const response = await fetch('/api/auth/edit-profile', {
			method: 'POST',
			headers: {
				type: 'multipart/form-data'
			},
			body: form
		});

		const result = await response.json();

		if (result.statusCode !== 200) {
			message.error.message = result.message;
			return fail(400, { ...message });
		}

		message.isSuccess = true;
		message.success.message = result.message;

		return message;
	},
	change_password: async ({ request, fetch }) => {
		const form = await request.formData();
		const oldPassword = form.get('oldPassword');
		const newPassword = form.get('newPassword');
		const confirmPassword = form.get('confirmPassword');

		if (!oldPassword || !newPassword || !confirmPassword) {
			return fail(400, {
				message: 'Please fill in all fields',
				error: 'Please fill in all fields',
				type: 'change_password'
			});
		}

		if (newPassword !== confirmPassword) {
			return fail(400, {
				message: 'New password and confirm new password do not match',
				error: 'New password and confirm new password do not match',
				type: 'change_password'
			});
		}

		if (newPassword.length < 8) {
			return fail(400, {
				message: 'Password must be at least 8 characters long',
				error: 'Password must be at least 8 characters long',
				type: 'change_password'
			});
		}

		const response = await fetch('/api/auth/change-password', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				oldPassword,
				newPassword,
				confirmPassword
			})
		});

		const result = await response.json();
		if (!result.ok) {
			return fail(400, {
				message: result.message,
				error: result.message,
				type: 'change_password'
			});
		}
		return {
			...result,
			type: 'change_password'
		};
	}
};
