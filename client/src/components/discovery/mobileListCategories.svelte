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
	if (currentTab === undefined) {
		currentTab = 'all';
	}
	let isClicked = false;

	function changeTab(tab: string) {
		isClicked = true;
		setTimeout(() => {
			isClicked = false;
		}, 2000);
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

<Button class="text-slate-900 border bg-gray-200 hover:bg-gray-400 px-10 text-base">
	<Chevron>{tab}</Chevron></Button
>
<Dropdown class="p-3 flex flex-col text-center">
	<li
		class="cursor-pointer inline-block rounded-lg {currentTab === 'all'
			? cssForCurrentTab
			: cssForOtherTab}"
	>
		<button
			class="w-full h-full py-3 px-4"
			on:click={() => changeTab('all')}
			disabled={isClicked}>{$t('common.all')}</button
		>
	</li>
	<li
		class=" cursor-pointer inline-block rounded-lg {currentTab === 'math'
			? cssForCurrentTab
			: cssForOtherTab}"
	>
		<button
			class="w-full h-full py-3 px-4"
			on:click={() => changeTab('math')}
			disabled={isClicked}>{$t('common.math')}</button
		>
	</li>
	<li
		class=" cursor-pointer inline-block rounded-lg {currentTab === 'science'
			? cssForCurrentTab
			: cssForOtherTab}"
	>
		<button
			class="w-full h-full py-3 px-4"
			on:click={() => changeTab('science')}
			disabled={isClicked}>{$t('common.science')}</button
		>
	</li>
	<li
		class=" cursor-pointer inline-block rounded-lg {currentTab === 'history'
			? cssForCurrentTab
			: cssForOtherTab}"
	>
		<button
			class="w-full h-full py-3 px-4"
			on:click={() => changeTab('history')}
			disabled={isClicked}>{$t('common.history')}</button
		>
	</li>
	<li
		class=" cursor-pointer inline-block rounded-lg {currentTab === 'english'
			? cssForCurrentTab
			: cssForOtherTab}"
	>
		<button
			class="w-full h-full py-3 px-4"
			on:click={() => changeTab('english')}
			disabled={isClicked}>{$t('common.english')}</button
		>
	</li>
	<li
		class=" cursor-pointer inline-block rounded-lg {currentTab === 'geography'
			? cssForCurrentTab
			: cssForOtherTab}"
	>
		<button
			class="w-full h-full py-3 px-4"
			on:click={() => changeTab('geography')}
			disabled={isClicked}
		>
			{$t('common.geography')}</button
		>
	</li>
	<li
		class=" cursor-pointer inline-block rounded-lg {currentTab === 'other'
			? cssForCurrentTab
			: cssForOtherTab}"
	>
		<button
			class="w-full h-full py-3 px-4"
			on:click={() => changeTab('other')}
			disabled={isClicked}>{$t('common.other')}</button
		>
	</li>
</Dropdown>
