import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	edit_profile: async ({ request, fetch }) => {
		const form = await request.formData();
		if (!form.has('displayName')) {
			return fail(400, {
				message: 'Display name cannot be empty',
				error: 'Display name cannot be empty',
				type: 'edit_profile'
			});
		}
		if (form.get('avatar') && form.get('avatar').size > 4 * 1024 * 1024) {
			return fail(400, {
				message: 'File size too large, max file size is 4MB',
				error: 'File size too large, max file size is 4MB',
				type: 'edit_profile'
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
				error: result.message,
				type: 'edit_profile'
			});
		}

		return {
			...result,
			type: 'edit_profile'
		};
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
