import type { TypeCategory } from './category.type';

export async function load({ fetch, params }) {
	const response = await fetch(`/api/quizzes/discovery/${params.categoryName}`);
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
