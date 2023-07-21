<script lang="ts">
	import type { IQuiz } from '../../routes/dashboard/quizzes/quiz.type';
	import Pagination from '../pagination.svelte';
	import Quiz from './quiz.svelte';

	export let quizzes: IQuiz[] = [];
</script>

<section class="w-full h-full py-10">
	<div class="w-11/12 h-fit flex flex-col gap-4 mx-auto">
		{#each quizzes as quiz}
			<Quiz
				title={quiz.title}
				author={quiz.username}
				description={quiz.description}
				numberOfQuestions={quiz.numberOfQuestions}
				image={quiz.image}
				createdAt={quiz.createdAt}
				id={quiz.id}
			/>
		{/each}
	</div>
</section>
