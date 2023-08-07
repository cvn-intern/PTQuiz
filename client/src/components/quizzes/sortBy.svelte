<script lang="ts">
	import { Button, Dropdown, Chevron, Radio } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { t } from '$i18n/translations';
	export let defaultSort: number;
	export let totalQuizzes: number;
	export let quizzes: IQuiz[];
	export let currentPage: number;

	$: typeOfSort = (() => {
		if (defaultSort === 0) return $t('common.increaseDate');
		if (defaultSort === 1) return $t('common.decreaseDate');
		if (defaultSort === 2) return $t('common.titleAZ');
		if (defaultSort === 3) return $t('common.titleZA');
	})();

	async function fetchQuizzes(page: number, sortBy: number) {
		const response = await fetch(`/api/quizzes/${page}/${sortBy}`);
		const data = await response.json();
		defaultSort = sortBy;
		quizzes = data.quizzesOfUser;
		totalQuizzes = data.totalQuizzes;
	}
	function handleSortChange(sortBy: number) {
		currentPage = 1;
		fetchQuizzes(currentPage, sortBy);
	}
</script>

<Button class="text-slate-900 border bg-gray-200 hover:bg-gray-400 w-40 shadow-lg">
	<Chevron>{typeOfSort}</Chevron></Button
>
<Dropdown class="w-full p-1 space-y-1">
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio
			name="typeOfSort"
			bind:group={defaultSort}
			value={0}
			on:click={() => handleSortChange(0)}>{$t('common.increaseDate')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio
			name="typeOfSort"
			bind:group={defaultSort}
			value={1}
			on:click={() => handleSortChange(1)}>{$t('common.decreaseDate')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio
			name="typeOfSort"
			bind:group={defaultSort}
			value={2}
			on:click={() => handleSortChange(2)}>{$t('common.titleAZ')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio
			name="typeOfSort"
			bind:group={defaultSort}
			value={3}
			on:click={() => handleSortChange(3)}>{$t('common.titleZA')}</Radio
		>
	</li>
</Dropdown>
