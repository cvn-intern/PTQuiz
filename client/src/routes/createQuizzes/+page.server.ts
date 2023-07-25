

export const actions = {
	createQuizz: async ({ fetch, request }) => {
		const data = await request.formData();
        console.log(data);
	}
};
