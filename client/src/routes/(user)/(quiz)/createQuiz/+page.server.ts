import { InforQuizFormSchema } from "../../../../libs/schema/inforQuiz";

export const actions = {
	createQuizz: async ({ fetch, request }) => {
		const data = await request.formData();
		try {
			const validatedData = InforQuizFormSchema.parse({
				titleQuiz: data.get('titleQuiz'),
				thumbnail: data.get('thumbnail')
			});
            console.log(validatedData);
			// const response = await fetch('/api/create-quiz/create', {
			// 	method: 'POST',
			// 	headers: { type: 'multipart/form-data' },
			// 	body: data
			// });
			// const result = await response.json();
			// console.log(result);
		} catch (error: any) {
			console.log(error);
		}
	}
};
