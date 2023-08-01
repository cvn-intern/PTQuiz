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

	const output: any[] = Object.keys(categories).map((categoryName) => {
		return {
			category: categoryName,
			quizzes: categories[categoryName]
		};
	});

	return output;
}

export async function load({ fetch, params }) {
	const response = await fetch(`/api/quizzes/discovery/${params.categoryName}`);
	const result = await response.json();
	console.log(result);
	if (response.status === 200) {
		const quizzes = transformQuizData(result.quizzes);
		return { quizzes, totalQuizzes: result.totalQuizzes };
	} else {
		return { categories: [] };
	}
}
