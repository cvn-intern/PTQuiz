<script lang="ts">
	import Pagination from '../pagination.svelte';
	import Quiz from './quiz.svelte';
	import { t } from '../../libs/i18n/translations';
	import { goto } from '$app/navigation';
	import type { IQuiz } from '../../routes/(user)/(quiz)/dashboard/quizzes/[[page]]/[[sortBy]]/quiz.type';
	import Icon from '@iconify/svelte';
	import SortBy from './sortBy.svelte';

	export let quizzes: IQuiz[] = [];

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
				<SortBy defaultSort={0} />
			</div>
		</div>
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
