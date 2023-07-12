export const actions = {
	register: async ({ fetch, request }) => {
		const formData = await request.formData();
		console.log(formData);
	}
};

// export const load = async (request) => {};
