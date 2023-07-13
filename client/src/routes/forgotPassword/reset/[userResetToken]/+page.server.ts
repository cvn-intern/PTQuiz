import { redirect } from '@sveltejs/kit';

export const actions = {
	reset: async ({ params, request, fetch }) => {
		const { userResetToken } = params;
		const data = await request.formData();
		const response = await fetch('/api/auth/reset', {
			method: 'POST',
			body: JSON.stringify({
				token: userResetToken,
				password: data.get('password'),
				confirmPassword: data.get('confirmPassword')
			})
		});
		const result = await response.json();
		if (response.status === 200) {
			throw redirect(303, '/login');
		} else {
			return {
				error: result
			};
		}
	}
};
