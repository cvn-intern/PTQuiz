<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, Chevron, Radio } from 'flowbite-svelte';
	import { questionData } from '$stores/questionInfoStore';
	import { t } from '$i18n/translations';
	import { isSubmitStore } from '$stores/isSubmitStore';
	export let index: number;
	export let defaultType = 1;

	$: typeOfQuestion = (() => {
		switch (defaultType) {
			case 0:
				return $t('common.multiChoice');
			case 1:
				return $t('common.singleChoice');
			case 2:
				return $t('common.crossCharacter');
			case 3:
				return $t('common.trueFalse');
			case 4:
				return $t('common.arrangeWord');
			case 5:
				return $t('common.inputText');
			case 6:
				return $t('common.gifSingleChoice');
			default:
				return $t('common.singleChoice');
		}
	})();
	$: questionData.update((data) => {
		if (defaultType != data[index].type) {
			isSubmitStore.set(false);

			data[index].options = {
				optionA: '',
				optionB: '',
				optionC: '',
				optionD: ''
			};
			data[index].written = '';
			data[index].image = '';
			data[index].type = defaultType;
			data[index].answers = {
				answerA: false,
				answerB: false,
				answerC: false,
				answerD: false
			};
			data[index].title = '';
		}
		if (data[index].type === 4) {
			data[index].title = 'Arrange word correctly';
		}
		return data;
	});
</script>

<Button class="text-slate-900 border bg-gray-200 hover:bg-gray-400">
	<Chevron>{typeOfQuestion}</Chevron></Button
>
<Dropdown class="p-3 space-y-1">
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfQuestion" bind:group={defaultType} value={0}
			>{$t('common.multiChoice')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfQuestion" bind:group={defaultType} value={1}
			>{$t('common.singleChoice')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfQuestion" bind:group={defaultType} value={2}
			>{$t('common.crossCharacter')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfQuestion" bind:group={defaultType} value={3}
			>{$t('common.trueFalse')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfQuestion" bind:group={defaultType} value={4}
			>{$t('common.arrangeWord')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfQuestion" bind:group={defaultType} value={5}
			>{$t('common.inputText')}</Radio
		>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfQuestion" bind:group={defaultType} value={6}
			>{$t('common.gifSingleChoice')}</Radio
		>
	</li>
</Dropdown>
