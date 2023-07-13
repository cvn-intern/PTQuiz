import { error, fail } from '@sveltejs/kit';

export const actions = {
	change_password: async ({ request, fetch }) => {
		const formData = await request.formData();
		console.log('formData: ', formData);
		const response = await fetch('/api/auth/change-password', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				oldPassword: formData.get('oldPassword'),
				newPassword: formData.get('newPassword'),
				confirmPassword: formData.get('confirmPassword')
			})
		});
		const result = await response.json();
		if (!result.ok) {
			// console.log('result.message: ', result.message);
			return fail(400, {
				message: result.message,
				error: result.error
			});
		}
		return result;
	}
};
