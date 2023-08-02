<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, Chevron, Radio } from 'flowbite-svelte';
	import { questionData } from '$stores/questionInfoStore';
	import { t } from '$i18n/translations';
	import { Category } from './interface/category.enum';
	import { date } from 'zod';
	export let index: number;
	export let defaultCategory = 0;
	$: categoryOfQuestion = (() => {
		switch (defaultCategory) {
			case 0:
				return $t('common.math');
			case 1:
				return $t('common.science');
			case 2:
				return $t('common.english');
			case 3:
				return $t('common.history');
			case 4:
				return $t('common.geography');
			case 5:
				return $t('common.literature');
			case 6:
				return $t('common.other');
			default:
				return $t('common.math');
		}
	})();
	$: questionData.update((data) => {
		switch (defaultCategory) {
			case 0:
				data[index].categoryId = Category.MATH;
				break;
			case 1:
				data[index].categoryId = Category.SCIENCE;
				break;
			case 2:
				data[index].categoryId = Category.ENGLISH;
				break;
			case 3:
				data[index].categoryId = Category.HISTORY;
				break;
			case 4:
				data[index].categoryId = Category.GEOGRAPHY;
				break;
			case 5:
				data[index].categoryId = Category.LITERATURE;
				break;
			case 6:
				data[index].categoryId = Category.OTHER;
				break;
			default:
				data[index].categoryId = Category.MATH;
				break;
		}

		return data;
	});
</script>

<Button class="text-slate-900 border bg-gray-200 hover:bg-gray-400">
	<Chevron>{categoryOfQuestion}</Chevron></Button
>
<Dropdown class="p-3 space-y-1">
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="categoryOfQuestion" bind:group={defaultCategory} value={0}
			>{$t('common.math')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="categoryOfQuestion" bind:group={defaultCategory} value={1}
			>{$t('common.science')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="categoryOfQuestion" bind:group={defaultCategory} value={2}
			>{$t('common.english')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="categoryOfQuestion" bind:group={defaultCategory} value={3}
			>{$t('common.history')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="categoryOfQuestion" bind:group={defaultCategory} value={4}
			>{$t('common.geography')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="categoryOfQuestion" bind:group={defaultCategory} value={5}
			>{$t('common.literature')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="categoryOfQuestion" bind:group={defaultCategory} value={6}
			>{$t('common.other')}</Radio
		>
	</li>
</Dropdown>
