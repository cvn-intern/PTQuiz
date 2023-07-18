<script lang="ts">
	import type { IQuiz } from '../../routes/dashboard/quizzes/quiz.type';
	import Pagination from '../pagination.svelte';
	import Quiz from './quiz.svelte';

	export let quizzes: IQuiz[] = [];
</script>

<section class="flex flex-col w-full h-full gap-4 px-5">
	<div class="">
		<button
			aria-label="Create quizzes"
			class="block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none"
			>Create quizzes</button
		>
	</div>
	<div class="w-full h-fit flex flex-col gap-4">
		{#each quizzes as quiz}
			<Quiz
				title={quiz.title}
				author={quiz.username}
				description={quiz.description}
				numberOfQuestions={quiz.numberOfQuestions}
				image={quiz.image}
				createdAt={quiz.createdAt}
			/>
		{/each}
	</div>
	<div class="flex justify-end">
		<Pagination />
	</div>
</section>
