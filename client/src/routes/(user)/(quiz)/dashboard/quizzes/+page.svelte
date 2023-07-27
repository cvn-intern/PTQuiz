<script lang="ts">
	import { goto } from '$app/navigation';
	import Quizzes from '$components/quizzes/quizzes.svelte';
	import { t } from '$i18n/translations';
	export let data;
	let { quizzes } = data;
	function handleCreateQuiz() {
		goto('/createQuiz');
	}
</script>

<div>
	{#if quizzes.length !== 0}
		<Quizzes {quizzes} />
	{:else}
		<div class="flex items-center h-full">
			<button
				aria-label="CreateQuiz"
				on:click={handleCreateQuiz}
				class="block px-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none w-1/6"
				>{$t('common.createQuizIntro')}</button
			>
			<div
				class="container flex flex-col md:flex-row sm:flex-row items-center justify-center p-5 text-gray-700"
			>
				<div class="w-full lg:w-1/2 md:w-1/3 sm:w-1/3 mx-8">
					<p class="text-2xl md:text-3xl sm:text-2xl font-light leading-normal mb-8">
						No quizzes found
					</p>
				</div>
			</div>
		</div>
	{/if}
</div>
