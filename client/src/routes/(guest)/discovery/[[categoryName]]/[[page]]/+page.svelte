<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Category from '$components/discovery/category.svelte';
	import ListCategories from '$components/discovery/listCategories.svelte';
	import MobileListCategories from '$components/discovery/mobileListCategories.svelte';
	import Dropdown from '$components/dropdown.svelte';
	import { t } from '$i18n/translations.js';
	import Icon from '@iconify/svelte';
	import type { TypeCategory } from './category.type.js';

	let totalQuizzes;
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
	<div class="md:hidden text-base font-medium text-gray-500 px-4 text-end relative z-20">
		<MobileListCategories />
	</div>
	{#each categories as category, indexOfCategory}
		{#if category.quizzes.length}
			<div class="hidden">
				{(totalQuizzes = category.totalQuizzes || data.totalQuizzes)}
			</div>

			<Category
				nameCategory={category.category}
				cardList={category.quizzes}
				bind:totalQuizzes
				{indexOfCategory}
				bind:quizzes={categories}
				bind:data
			/>
		{:else}
			<div class="px-4 md:py-8 md:px-12 lg:px-20">
				<div class="flex flex-row">
					<h1
						class="text-2xl font-semibold font-body mb-7 w-1/12 text-zinc-800 border-spacing-3 border-b-2"
					>
						{category.category}
					</h1>
				</div>
				<div
					class="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 justify-items-center items-center grid-3xl lg:gap-10"
				>
					<a
						href="#"
						class="cursor-pointer max-w-sm lg:w-80 bg-gray-200 shadow-lg rounded-xl p-6 flex items-center justify-center w-full h-full"
						on:click={() => goto('/createQuiz')}
					>
						<Icon
							icon="zondicons:add-solid"
							class="w-20 h-20 text-green-500 hover:w-24 hover:h-24"
						/>
					</a>
					<div class="text-center text-gray-500">
						<p class="text-2xl font-semibold font-body mb-7 text-zinc-800">
							{$t('common.noQuizzesFound')}
						</p>
					</div>
				</div>
			</div>
		{/if}
	{/each}
</div>
