import { fail } from '@sveltejs/kit';
import type Message from './interface/message.interface';
import { createDefaultMessage } from './interface/message.interface';

let message: Message;

export const actions = {
	createQuiz: async ({ fetch, request }) => {
		message = createDefaultMessage();
		const form = await request.formData();
		try {
			const response = await fetch('/api/quizzes/create', {
				method: 'POST',
				headers: { type: 'multipart/form-data' },
				body: form
			});
			const result = await response.json();

			message.isDone = true;
			console.log(result);
			message.isSuccess = result.statusCode == 201;
			message.success.message = result.message;
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
