import type { PageServerLoad } from '../$types';

import { InforQuizFormSchema } from '$libs/schema/inforQuiz';
import { createDefaultMessage } from '../interface/message.interface';
import type Message from '../interface/message.interface';
import { questionData, type QuestionData } from '$stores/questionInfoStore';
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
			index: 1
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

			if (isNaN(+validatedData.passingPoint) || isNaN(+validatedData.point)) {
				message.isDone = true;
				message.isSuccess = false;
				message.error.message = 'Point must be a number';
				return message;
			}

			if (+validatedData.passingPoint > +validatedData.point) {
				message.isDone = true;
				message.isSuccess = false;
				message.error.message = 'Passing point must be less than point';
				return message;
			}

			if (+validatedData.passingPoint < 0 || +validatedData.point < 0) {
				message.isDone = true;
				message.isSuccess = false;
				message.error.message = 'Point must be greater than 0';
				return message;
			}

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
			message.error.message = error.errors[0].message;
			return message;
		}
	}
};
