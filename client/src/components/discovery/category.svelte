<script lang="ts">
	import Card from './card.svelte';
	export let nameCategory = '';
	export let cardList: any[] = [];
</script>

<div class="px-4 md:py-8 md:px-12 lg:px-20">
	<h1 class="text-2xl font-semibold font-body mb-7 border-b border-gray-300 w-1/5">
		{nameCategory}
	</h1>

	<div
		class=" grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-10 2xl:grid-cols-6 sm:grid-cols-2 md:grid-cols-3"
	>
		{#each cardList as card}
			<Card nameofquiz={card.title} author={card.user.displayName} image={card.image} />
		{/each}
	</div>
</div>
