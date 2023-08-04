<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Category from '$components/discovery/category.svelte';
	import { t } from '$i18n/translations.js';
	import { Button, Chevron, Dropdown } from 'flowbite-svelte';

	let cssForCurrentTab = ' active dark:text-blue-500 dark:border-blue-500 bg-secondary';
	let cssForOtherTab =
		' border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';
	let currentTab = $page.params.categoryName;

	function changeTab(tab: string) {
		currentTab = tab;
		goto('/discovery/' + tab);
	}
	$: tab = (() => {
		switch (currentTab) {
			case 'all':
				return $t('common.all');
			case 'math':
				return $t('common.math');
			case 'science':
				return $t('common.science');
			case 'history':
				return $t('common.history');
			case 'english':
				return $t('common.english');
			case 'geography':
				return $t('common.geography');
			case 'other':
				return $t('common.other');
		}
	})();
</script>

<Button class="text-slate-900 border bg-gray-200 hover:bg-gray-400 px-10">
	<Chevron>{tab}</Chevron></Button
>
<Dropdown class="p-3 flex flex-col text-center">
	<li
		class=" cursor-pointer inline-block p-4 rounded-lg {currentTab === 'all'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('all')}
	>
		{$t('common.all')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 rounded-lg {currentTab === 'math'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('math')}
	>
		{$t('common.math')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 rounded-lg {currentTab === 'science'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('science')}
	>
		{$t('common.science')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 rounded-lg {currentTab === 'history'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('history')}
	>
		{$t('common.history')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 rounded-lg {currentTab === 'english'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('english')}
	>
		{$t('common.english')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 rounded-lg {currentTab === 'geography'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('geography')}
	>
		{$t('common.geography')}
	</li>
	<li
		class=" cursor-pointer inline-block p-4 rounded-lg {currentTab === 'other'
			? cssForCurrentTab
			: cssForOtherTab}"
		on:click={() => changeTab('other')}
	>
		{$t('common.other')}
	</li>
</Dropdown>
