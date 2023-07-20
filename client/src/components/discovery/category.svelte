<script lang="ts">
	import Card from './card.svelte';
	export let nameCategory = '';
	export let cardList: any[] = [];
</script>

<div class="px-4 md:py-8 md:px-12 lg:px-20">
	<h1
		class="text-2xl font-semibold font-body mb-7 w-1/12 text-zinc-800 border-spacing-3 border-b-2"
	>
		{nameCategory}
	</h1>

	<div
		class="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 justify-items-center items-center grid-3xl lg:gap-10"
	>
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
