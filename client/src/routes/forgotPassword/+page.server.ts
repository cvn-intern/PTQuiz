import { redirect } from '@sveltejs/kit';

export const actions = {
	forgotPassword: async ({ fetch, request }) => {
		const data = await request.formData();
		const response = await fetch('/api/auth/forgotPassword', {
			method: 'POST',
			body: JSON.stringify({
				email: data.get('email')
			})
		});
		const result = await response.json();
		if (response.status === 200) {
			throw redirect(303, '/forgotPassword/loading');
		} else {
			return {
				error: result
			};
		}
	}
};
