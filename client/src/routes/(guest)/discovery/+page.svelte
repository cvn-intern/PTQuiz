<script lang="ts">
	import Category from '$components/discovery/category.svelte';

	export let data;
	let { categories } = data;
</script>

<div class="py-10">
	{#each categories as category}
		<Category nameCategory={category.category} cardList={category.quizzes} />
	{/each}
</div>
