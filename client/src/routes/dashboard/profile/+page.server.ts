import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	edit_profile: async ({ request, fetch }) => {
		const form = await request.formData();
		if (!form.has('displayName')) {
			return fail(400, {
				message: 'Display name can not be empty',
				// error: 'Display name can not be empty'
			});
		}
		if (form.get('avatar') && form.get('avatar').size > 4 * 1024 * 1024) {
			return fail(400, {
				message: 'File size too large, max file size is 4MB',
				// error: 'File size too large, max file size is 4MB'
			});
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
			return fail(400, {
				message: result.message,
				// error: result.message
			});
		}

		return result;
	},
	change_password: async ({ request, fetch }) => {
		const form = await request.formData();
		if (!form.has('oldPassword') || !form.has('newPassword') || !form.has('confirmPassword')) {
			return fail(400, {
				message: 'Please fill in all fields',
				error: 'Please fill in all fields'
			});
		}

		if (form.get('newPassword') !== form.get('confirmPassword')) {
			return fail(400, {
				message: 'New password and confirm new password do not match',
				error: 'New password and confirm new password do not match'
			});
		}

		if (
			form.get('newPassword').length < 8 ||
			form.get('confirmPassword').length < 8 ||
			form.get('oldPassword').length < 8
		) {
			return fail(400, {
				message: 'Password must be at least 8 characters long',
				error: 'Password must be at least 8 characters long'
			});
		}

		const response = await fetch('/api/auth/change-password', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				oldPassword: form.get('oldPassword'),
				newPassword: form.get('newPassword'),
				confirmPassword: form.get('confirmPassword')
			})
		});

		const result = await response.json();
		if (!result.ok) {
			return fail(400, {
				message: result.message,
				error: result.message
			});
		}
		return result;
	}
};
