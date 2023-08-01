<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Category from '$components/discovery/category.svelte';
	import { t } from '$i18n/translations.js';
	import type { TypeCategory } from './category.type.js';

	export let data;
	let categories: TypeCategory[] ;
	$: categories = data.categories;
	let cssForCurrentTab = " text-blue-600  border-blue-600  active dark:text-blue-500 dark:border-blue-500";
	let cssForOtherTab = " border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
	let currentTab = $page.params.categoryName;

	function changeTab(tab: string){
		currentTab = tab;
		goto("/discovery/"+tab)
	}

</script>


<div class="py-8">
	<div class="text-xl font-medium text-center text-gray-500 px-4 md:px-12 lg:px-20 flex justify-center">
		<ul class="flex flex-wrap gap-5">
			<li class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab===$t('common.all')? cssForCurrentTab : cssForOtherTab}"  on:click={()=>changeTab($t('common.all'))}>
				{$t('common.all')}
			</li>
			<li class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab===$t('common.math')? cssForCurrentTab : cssForOtherTab}"  on:click={()=>changeTab($t('common.math'))}>
				{$t('common.math')}
			</li>
			<li class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab===$t('common.science')? cssForCurrentTab : cssForOtherTab}"  on:click={()=>changeTab($t('common.science'))}>
				{$t('common.science')}
			</li>
			<li class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab===$t('common.history')? cssForCurrentTab : cssForOtherTab}"  on:click={()=>changeTab($t('common.history'))}>
				{$t('common.history')}
			</li>
			<li class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab===$t('common.english')? cssForCurrentTab : cssForOtherTab}"  on:click={()=>changeTab($t('common.english'))}>
				{$t('common.english')}
			</li>
			<li class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab===$t('common.geography')? cssForCurrentTab : cssForOtherTab}"  on:click={()=>changeTab($t('common.geography'))}>
				{$t('common.geography')}
			</li>
			<li class=" cursor-pointer mr-2 inline-block p-4 border-b-2 rounded-t-lg {currentTab===$t('common.other')? cssForCurrentTab : cssForOtherTab}"  on:click={()=>changeTab($t('common.other'))}>
				{$t('common.other')}
			</li>

		</ul>
	</div>
		{#each categories as category}
			<Category nameCategory={category.category} cardList={category.quizzes} />
		{/each}
</div>
