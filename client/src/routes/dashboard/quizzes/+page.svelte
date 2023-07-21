<script lang="ts">
	import Quizzes from '../../../components/quizzes/quizzes.svelte';
	export let data;
	let { quizzes } = data;
</script>

<div>
	{#if quizzes.length !== 0}
		<Quizzes {quizzes} />
	{:else}
		<div class="flex items-center h-full">
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
