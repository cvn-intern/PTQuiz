import type { TypeCategory } from './category.type';

export async function load({ fetch }) {
	const response = await fetch('/api/quizzes/discovery');
	const result = await response.json();
	if (response.status === 200) {
		const categories: TypeCategory[] = result.map((category: TypeCategory) => {
			return {
				category: category.category,
				quizzes: category.quizzes
			};
		});
		return { categories: categories };
	} else {
		return { categories: [] };
	}
}
