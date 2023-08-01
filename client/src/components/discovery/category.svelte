<script lang="ts">
	import { goto } from '$app/navigation';
import Card from './card.svelte';
	import Icon from '@iconify/svelte';
	export let nameCategory = '';
	export let cardList: any[] = [];
	function addQuiz() {
		goto('/createQuiz');
	}
</script>

<div class="px-4 md:py-8 md:px-12 lg:px-20">
	<div class="flex flex-row">
		<h1
			class="text-2xl font-semibold font-body mb-7 w-1/12 text-zinc-800 border-spacing-3 border-b-2"
		>
			{nameCategory}
		</h1>
		
	</div>
	<div
		class="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 justify-items-center items-center grid-3xl lg:gap-10"
	>
	<div class="cursor-pointer max-w-sm lg:w-80 bg-gray-50 shadow-lg rounded-xl p-6 flex items-center justify-center w-full h-full" on:click={()=>addQuiz()}>
		<Icon icon="zondicons:add-solid" class="w-20 h-20 text-green-500 hover:w-24 hover:h-24"/>
	</div>
		{#each cardList as card}
			<Card
				nameOfQuiz={card.title}
				author={card.user.displayName}
				image={card.image}
				category={nameCategory}
				time={card.durationMins}
				amountOfQuestions={card.numberQuestions}
				level={card.difficultyLevel}
				id={card.id}
			/>
		{/each}
	</div>
</div>

<style>
	@media (min-width: 1700px) {
		.grid-3xl {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
	}
</style>
