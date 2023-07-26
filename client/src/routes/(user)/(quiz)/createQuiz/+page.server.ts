import { goto } from '$app/navigation';
import { fail } from '@sveltejs/kit';
import { InforQuizFormSchema } from '../../../../libs/schema/inforQuiz';

export const actions = {
	createQuiz: async ({ fetch, request }) => {
		const form = await request.formData();
		try {
			// const validatedData = InforQuizFormSchema.parse({
			// 	title: form.get('title'),
			// 	passingPoint: form.get('passingPoint'),
			// 	point: form.get('point'),
			// 	decription: form.get('decription'),
			// 	image: form.get('image')
			// });
			const response = await fetch('/api/quizzes/create', {
				method: 'POST',
				headers: { type: 'multipart/form-data' },
				body: form
			});
			const result = await response.json();

			if (result.statusCode !== 201) {
				return fail(result.message);
			}
		} catch (error: any) {
			console.log(error);
		}
	}
};
