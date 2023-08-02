import { any } from 'zod';
import type { TypeCategory, quiz } from './category.type';

function transformQuizData(quizzes: any[]): any[] {
	const categories: { [key: string]: quiz[] } = {};

	for (let quizData of quizzes) {
		const categoryName = quizData.category.name;
		if (!categories[categoryName]) {
			categories[categoryName] = [];
		}
		categories[categoryName].push(quizData);
	}

	const output = Object.keys(categories).map((categoryName) => {
		return [
			{
				category: categoryName,
				quizzes: categories[categoryName]
			}
		];
	});

	return [output];
}

export async function load({ fetch, params }) {
	const categoryName = params.categoryName || 'All';
	const page = params.page || 1;
	const response = await fetch(`/api/quizzes/discovery/${categoryName}/${page}`);
	const result = await response.json();
	if (response.status === 200) {
		if (result.length < 1) {
			const quizzes = transformQuizData(result.quizzes);
			return { quizzes: quizzes, totalQuizzes: result.totalQuizzes };
		} else {
			return { quizzes: result };
		}
	} else {
		return { categories: [] };
	}
}
