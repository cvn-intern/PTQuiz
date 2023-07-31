import type Message from './interface/message.interface';
import { createDefaultMessage } from './interface/message.interface';
import { InforQuizFormSchema } from '$libs/schema/inforQuiz';

let message: Message;

export const actions = {
	createQuiz: async ({ fetch, request }) => {
		message = createDefaultMessage();
		const form = await request.formData();

		try {
			const validatedData = InforQuizFormSchema.parse({
				title: form.get('title'),
				passingPoint: parseInt(form.get('passingPoint')),
				point: parseInt(form.get('point')),
				image: form.get('image')
			});
			const response = await fetch('/api/quizzes/create', {
				method: 'POST',
				headers: { type: 'multipart/form-data' },
				body: form
			});
			const result = await response.json();
			message.isDone = true;
			message.isSuccess = result.statusCode == 201;
			message.success.message = result.message;
			message.success.id = result.data.id;
			message.error.message = result.message;
			return message;
		} catch (error: any) {
			message.isDone = true;
			message.isSuccess = false;
			message.error.message = error.errors[0].message;
			return message;
		}
	}
};
