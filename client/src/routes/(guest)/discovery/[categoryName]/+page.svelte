<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Category from '$components/discovery/category.svelte';
	import type { TypeCategory } from './category.type.js';

	export let data;
	let categories: TypeCategory[];
	$: categories = data.quizzes;
	let cssForCurrentTab =
		' text-blue-600  border-blue-600  active dark:text-blue-500 dark:border-blue-500';
	let cssForOtherTab =
		' border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';
	let currentTab = $page.params.categoryName;

	function changeTab(tab: string) {
		currentTab = tab;
		goto('/discovery/' + tab);
	}
</script>

<div class="py-10">
	<div class="text-xl font-medium text-center text-gray-500 px-4 md:py-8 md:px-12 lg:px-20">
		<ul class="flex flex-wrap gap-5">
			<li
				class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab ===
				'All'
					? cssForCurrentTab
					: cssForOtherTab}"
				on:click={() => changeTab('All')}
			>
				All
			</li>
			<li
				class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab ===
				'Math'
					? cssForCurrentTab
					: cssForOtherTab}"
				on:click={() => changeTab('Math')}
			>
				Math
			</li>
			<li
				class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab ===
				'Science'
					? cssForCurrentTab
					: cssForOtherTab}"
				on:click={() => changeTab('Science')}
			>
				Science
			</li>
			<li
				class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab ===
				'History'
					? cssForCurrentTab
					: cssForOtherTab}"
				on:click={() => changeTab('History')}
			>
				History
			</li>
			<li
				class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab ===
				'English'
					? cssForCurrentTab
					: cssForOtherTab}"
				on:click={() => changeTab('English')}
			>
				English
			</li>
			<li
				class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab ===
				'Geography'
					? cssForCurrentTab
					: cssForOtherTab}"
				on:click={() => changeTab('Geography')}
			>
				Geography
			</li>
			<li
				class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab ===
				'Other'
					? cssForCurrentTab
					: cssForOtherTab}"
				on:click={() => changeTab('Other')}
			>
				Other
			</li>
		</ul>
	</div>
	{#each categories as category}
		<Category
			nameCategory={category.category}
			cardList={category.quizzes}
			totalQuizzes={data.totalQuizzes}
		/>
	{/each}
</div>
