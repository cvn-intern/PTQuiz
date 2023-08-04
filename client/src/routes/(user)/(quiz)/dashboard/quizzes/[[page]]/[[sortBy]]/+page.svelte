<script lang="ts">
	import { goto } from '$app/navigation';
	import Quizzes from '$components/quizzes/quizzes.svelte';
	import { t } from '$i18n/translations';
	export let data;
	let quizzes: any;
	let totalQuizzes: any;
	$: {
		quizzes = data.quizzes;
		totalQuizzes = data.totalQuizzes;
	}
	function handleCreateQuiz() {
		goto('/createQuiz');
	}
</script>

<div>
	{#if quizzes.length !== 0}
		<Quizzes {quizzes} {totalQuizzes} />
	{:else}
		<div class="flex h-full flex-col gap-4 p-6">
			<button
				aria-label="CreateQuiz"
				on:click={handleCreateQuiz}
				class="block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none md:w-1/6 w-3/6"
				>{$t('common.createQuizIntro')}</button
			>

			<div class="container flex flex-col md:flex-row sm:flex-row text-gray-700">
				<div class="w-full lg:w-1/2 md:w-1/3 sm:w-1/3">
					<p class="text-2xl md:text-3xl sm:text-2xl font-light leading-normal">
						{$t('common.noQuizzesFound')}
					</p>
				</div>
			</div>
		</div>
	{/if}
</div>
