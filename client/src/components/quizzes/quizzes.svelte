<script lang="ts">
	import Pagination from '../pagination.svelte';
	import Quiz from './quiz.svelte';
	import { t } from '../../libs/i18n/translations';
	import { goto } from '$app/navigation';
	import SortBy from './sortBy.svelte';
	import type { IQuiz } from '../../routes/(user)/(quiz)/dashboard/quizzes/[[page]]/[[sortBy]]/quiz.type';

	export let quizzes: IQuiz[];
	export let totalQuizzes: number;
	let defaultSort = 0;
	let currentPage = 1;

	function handleCreateQuiz() {
		goto('/createQuiz');
	}
</script>

<section class="w-full h-full py-10">
	<div class="w-11/12 h-fit flex flex-col gap-4 mx-auto">
		<div class="flex justify-between">
			<button
				aria-label="CreateQuiz"
				on:click={handleCreateQuiz}
				class="block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none md:w-1/6 w-3/6"
				>{$t('common.createQuizIntro')}</button
			>
			<div class="relative z-10">
				<SortBy bind:quizzes {totalQuizzes} bind:defaultSort bind:currentPage />
			</div>
		</div>
		{#each quizzes as quiz}
			<Quiz
				title={quiz.title}
				description={quiz.description}
				numberOfQuestions={quiz.numberOfQuestions}
				image={quiz.image}
				createdAt={quiz.createdAt}
				id={quiz.id}
				{quiz}
				bind:quizzes
			/>
		{/each}
		<div class="">
			<Pagination bind:quizzes {totalQuizzes} bind:defaultSort bind:currentPage />
		</div>
	</div>
</section>
