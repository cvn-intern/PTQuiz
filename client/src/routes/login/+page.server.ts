export const actions = {
	login: async ({ fetch, request }) => {
		const response = await fetch('/api/auth/oauth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
			// body: FormData(request)
		});
		console.log(await request.formData());
		const result = await response.json();
		return result;
	}
};