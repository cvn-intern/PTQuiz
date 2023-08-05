<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Category from '$components/discovery/category.svelte';
	import { t } from '$i18n/translations.js';

	let cssForCurrentTab = ' active dark:text-blue-500 dark:border-blue-500 bg-secondary';
	let cssForOtherTab =
		' border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';
	let currentTab = $page.params.categoryName;

	function changeTab(tab: string) {
		currentTab = tab;
		goto('/discovery/' + tab + '/1');
	}
</script>

<ul class="flex flex-wrap gap-1">
	<li
		class=" cursor-pointer inline-block p-4 px-5 rounded-lg {currentTab === 'all'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('all')}
	>
		{$t('common.all')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 px-5 rounded-lg {currentTab === 'math'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('math')}
	>
		{$t('common.math')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 px-5 rounded-lg {currentTab === 'science'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('science')}
	>
		{$t('common.science')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 px-5 rounded-lg {currentTab === 'history'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('history')}
	>
		{$t('common.history')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 px-5 rounded-lg {currentTab === 'english'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('english')}
	>
		{$t('common.english')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 px-5 rounded-lg {currentTab === 'geography'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('geography')}
	>
		{$t('common.geography')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 px-5 rounded-lg {currentTab === 'other'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('other')}
	>
		{$t('common.other')}
	</li>
</ul>
