import { redirect } from '@sveltejs/kit';

export const actions = {
	register: async ({ fetch, request }) => {
		const data = await request.formData();
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
			return {
				error: result
			};
		}
	}
};
