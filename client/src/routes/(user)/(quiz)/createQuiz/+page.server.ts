import type Message from './interface/message.interface';
import { createDefaultMessage } from './interface/message.interface';
import { InforQuizFormSchema } from '$libs/schema/inforQuiz';
import { fail } from '@sveltejs/kit';

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
			console.log(result);
			message.success.message = result.message;
			message.success.id = result.data.id;
			message.error.message = result.message;
			return message;
		} catch (error: any) {
			message.isDone = true;
			message.isSuccess = false;

			for (let i = 0; i < error.errors.length; i++) {
				(message.error.missing as Record<string, boolean>)[`${error.errors[i].path}`] =
					true;
				(message.error.message as unknown as Record<string, string>)[
					`${error.errors[i].path}`
				] = error.errors[i].message;
			}

			return fail(400, { message });
		}
	}
};
