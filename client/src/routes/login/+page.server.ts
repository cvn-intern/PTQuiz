import { redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ fetch, request }) => {
		const data = await request.formData();
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
			return {
				error: result
			};
		}
	}
};
