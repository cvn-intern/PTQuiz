import { fail, type Actions, json } from '@sveltejs/kit';
import type Message from './interface/message.interface';
import { createDefaultMessage } from './interface/message.interface';
import { ResponseMessage as MESSAGE } from '../../../libs/message/responseMessage.enum';

let message: Message;

export const actions: Actions = {
	edit_profile: async ({ request, fetch }) => {
		message = createDefaultMessage();
		const form = await request.formData();
		const displayName = form.get('displayName');
		const avatar = form.get('avatar');

		message.tabs.edit_profile = true;
		message.isSuccess = false;

		if (!displayName || displayName.trim().length === 0) {
			message.isDone = true;
			message.error.missing.displayName = true;
			message.error.message = MESSAGE.MISSING_DISPLAY_NAME;
			return fail(400, { ...message });
		}

		if (displayName.length < 3) {
			message.isDone = true;
			message.error.missing.displayName = true;
			message.error.message = MESSAGE.DISPLAY_NAME_MUST_BE_AT_LEAST_3_CHARACTERS;
			return fail(400, { ...message });
		}

		if (avatar && avatar.size > import.meta.env.VITE_MAX_FILE_SIZE) {
			message.isDone = true;
			message.error.message = MESSAGE.AVATAR_MUST_BE_LESS_THAN_5MB;
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
			message.isDone = true;
			message.error.message = result.message;
			return fail(400, { ...message });
		}

		message.isSuccess = true;
		message.isDone = true;
		message.success.message = result.message;

		return message;
	},
	change_password: async ({ request, fetch }) => {
		message = createDefaultMessage();
		const form = await request.formData();
		const oldPassword = form.get('oldPassword');
		const newPassword = form.get('newPassword');
		const confirmPassword = form.get('confirmPassword');

		message.tabs.change_password = true;

		if (!oldPassword || !newPassword || !confirmPassword) {
			if (!oldPassword) message.error.missing.oldPassword = true;
			if (!newPassword) message.error.missing.newPassword = true;
			if (!confirmPassword) message.error.missing.confirmPassword = true;
			message.error.message = MESSAGE.MISSING_PASSWORD;
			message.isDone = true;
			return fail(400, {
				...message
			});
		}

		if (newPassword.length < 8) {
			message.error.missing.newPassword = true;
			message.isDone = true;
			message.error.message = MESSAGE.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS;
			return fail(400, {
				...message
			});
		}

		if (newPassword !== confirmPassword) {
			message.error.missing.confirmPassword = true;
			message.isDone = true;
			message.error.message = MESSAGE.CONFIRM_PASSWORD_MUST_MATCH_PASSWORD;
			return fail(400, {
				...message
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
		if (result.statusCode !== 200) {
			message.isDone = true;
			message.error.message = result.message;
			return fail(400, {
				...message
			});
		}

		message.isSuccess = true;
		message.isDone = true;
		message.success.message = result.message;
		return message;
	}
};
