import type { PageServerLoad } from '../$types';

import { InforQuizFormSchema } from '$libs/schema/inforQuiz';
import { createDefaultMessage } from '../interface/message.interface';
import type Message from '../interface/message.interface';
export const load: PageServerLoad = async ({ fetch, params }) => {
	const response = await fetch(`/api/quizzes/get/${params.quizId}`, {
		method: 'GET'
	});

	const result = await response.json();

	return {
		title: 'Get infor Quiz',
		result
	};
};

let message: Message;

export const actions = {
	updateQuiz: async ({ fetch, request, params }) => {
		message = createDefaultMessage();
		const form = await request.formData();

		try {
			const validatedData = InforQuizFormSchema.parse({
				title: form.get('title'),
				passingPoint: form.get('passingPoint'),
				point: form.get('point'),
				image: form.get('image')
			});
			const response = await fetch(`/api/quizzes/update/${params.quizId}`, {
				method: 'PUT',
				headers: { type: 'multipart/form-data' },
				body: form
			});
			const result = await response.json();
			message.isDone = true;
			message.isSuccess = result.statusCode == 200;
			message.success.message = result.message;
			message.success.id = result.data.id;
			message.error.message = result.message;
			return message;
		} catch (error: any) {
			message.isDone = true;
			message.isSuccess = false;
			message.error.message = error.message;
			return message;
		}
	}
};
