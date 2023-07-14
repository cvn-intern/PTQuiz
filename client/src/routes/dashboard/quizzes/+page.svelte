<script lang="ts">
	import Quizzes from '../../../components/quizzes/quizzes.svelte';
	import SearchSort from '../../../components/searchSort.svelte';
	export let data;
	let { quizzes } = data;
	console.log(quizzes);
</script>

{#if quizzes.length !== 0}
	<SearchSort />
	<Quizzes {quizzes} />
{:else}
	<div class="" />
	<div class="flex items-center h-full">
		<div
			class="container flex flex-col md:flex-row sm:flex-row items-center justify-center px-5 text-gray-700"
		>
			<div class="w-full lg:w-1/2 md:w-1/3 sm:w-1/3 mx-8">
				<p class="text-2xl md:text-3xl sm:text-2xl font-light leading-normal mb-8">
					No quizzes found
				</p>
				<button
					aria-label="Create quizzes"
					class="block p-4 py-2 rounded-md bg-secondary hover:bg-darkGreen text-white focus:outline-none"
					>Create quizzes</button
				>
			</div>
		</div>
	</div>
{/if}
