import type { PageServerLoad } from '../$types';

import { InforQuizFormSchema } from '$libs/schema/inforQuiz';
import { createDefaultMessage } from '../interface/message.interface';
import type Message from '../interface/message.interface';
import { questionData, type QuestionData } from '$stores/questionInfoStore';
import { fail } from '@sveltejs/kit';
export const load: PageServerLoad = async ({ fetch, params }) => {
	const response = await fetch(`/api/quizzes/get/${params.quizId}`, {
		method: 'GET'
	});
	const result = await response.json();
	const questions: QuestionData[] = result.data.questions.map((question) => {
		const result: QuestionData = {
			id: question.id,
			categoryId: question.categoryId,
			title: question.title,
			options: {
				optionA: question.options.optionA,
				optionB: question.options.optionB,
				optionC: question.options.optionC,
				optionD: question.options.optionD
			},
			answers: {
				answerA: question.answers.answerA,
				answerB: question.answers.answerB,
				answerC: question.answers.answerC,
				answerD: question.answers.answerD
			},
			written: question.written,
			image: question.image,
			type: question.type,
			index: 1,
			time: question.time
		};
		return result;
	});

	return {
		title: 'Get infor Quiz',
		result,
		questions
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
				passingPoint: parseInt(form.get('passingPoint')),
				point: parseInt(form.get('point')),
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
			console.log(error);
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
