import { redirect } from '@sveltejs/kit';

export const actions = {
	resend: async ({ fetch, request }) => {
		const data = await request.formData();
		const response = await fetch('/api/auth/resend', {
			method: 'POST',
			body: JSON.stringify({
				email: data.get('email')
			})
		});
		const result = await response.json();
		if (response.status === 200) {
			throw redirect(303, '/register/loading');
		} else {
			return {
				error: result
			};
		}
	}
};
