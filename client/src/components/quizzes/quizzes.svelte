<script lang="ts">
	import Pagination from '../pagination.svelte';
	import Quiz from './quiz.svelte';
	import { t } from '../../libs/i18n/translations';
	import { goto } from '$app/navigation';
	import SortBy from './sortBy.svelte';
	import type { IQuiz } from '../../routes/(user)/(quiz)/dashboard/quizzes/[[page]]/[[sortBy]]/quiz.type';
	import Icon from '@iconify/svelte';

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
				class="p-2 text-secondary border-2 rounded-lg shadow-xl border-secondary hover:border-green-800 hover:text-green-800 focus:outline-none md:w-1/12 w-1/6 flex items-center justify-center"
			>
				<Icon icon="mdi:note-add" class="w-8 h-8" />
			</button>

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
				createdAt={new Date(quiz.createdAt).toLocaleString('vi-VN', {
					timeZone: 'Asia/Ho_Chi_Minh'
				})}
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
