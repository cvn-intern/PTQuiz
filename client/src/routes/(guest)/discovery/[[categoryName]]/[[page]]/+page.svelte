<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Category from '$components/discovery/category.svelte';
	import ListCategories from '$components/discovery/listCategories.svelte';
	import MobileListCategories from '$components/discovery/mobileListCategories.svelte';
	import Dropdown from '$components/dropdown.svelte';
	import { t } from '$i18n/translations.js';
	import type { TypeCategory } from './category.type.js';

	export let data;
	let categories: TypeCategory[];
	$: categories = data.quizzes;
	let cssForCurrentTab = ' active dark:text-blue-500 dark:border-blue-500 bg-secondary';
	let cssForOtherTab =
		' border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';
	let currentTab = $page.params.categoryName;

	function changeTab(tab: string) {
		currentTab = tab;
		goto('/discovery/' + tab);
	}
</script>

<div class="py-8 w-screen">
	<div
		class=" flex text-xl font-medium text-center text-gray-500 px-4 md:py-8 md:px-12 lg:px-20 justify-center max-md:hidden"
	>
		<ListCategories />
	</div>
	<div class="md:hidden text-xl font-medium text-gray-500 px-4 text-end relative z-20">
		<MobileListCategories />
	</div>
	{#each categories as category, indexOfCategory}
		{#if category.quizzes.length}
			<Category
				nameCategory={category.category}
				cardList={category.quizzes}
				totalQuizzes={category.totalQuizzes}
				{indexOfCategory}
			/>
		{/if}
	{/each}
</div>
