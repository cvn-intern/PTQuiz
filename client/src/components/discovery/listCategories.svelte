<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { t } from '$i18n/translations.js';

	let cssForCurrentTab = ' active text-white dark:text-blue-500 dark:border-blue-500 bg-secondary';
	let cssForOtherTab =
		' border-transparent hover:text-secondary/80 hover:border-gray-800 dark:hover:text-gray-300';
	let currentTab = $page.params.categoryName;
	let isClicked = false;
	if (currentTab === undefined) {
		currentTab = 'all';
	}

	function changeTab(tab: string) {
		isClicked = true;
		setTimeout(() => {
			isClicked = false;
		}, 2000);
		currentTab = tab;
		goto('/discovery/' + tab + '/1');
	}
</script>

<ul class="w-2/3grid grid-cols-7 gap-2 justify-center">
	<li
		class="cursor-pointer inline-block rounded-lg {currentTab === 'all'
			? cssForCurrentTab
			: cssForOtherTab}"
	>
		<button
			class="w-full h-full py-2 px-4"
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
			class="w-full h-full py-2 px-4"
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
			class="w-full h-full py-2 px-4"
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
			class="w-full h-full py-2 px-4"
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
			class="w-full h-full py-2 px-4"
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
			class="w-full h-full py-2 px-4"
			on:click={() => changeTab('other')}
			disabled={isClicked}>{$t('common.other')}</button
		>
	</li>
</ul>
