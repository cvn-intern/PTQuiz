<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, Chevron, Radio } from 'flowbite-svelte';
	import { questionData } from '$stores/questionInfoStore';
	export let index: number;
	export let defaultType = 1;
	$: typeOfQuestion = (() => {
		if (defaultType === 0) return 'Multi Choice';
		if (defaultType === 1) return 'Single Choice';
		if (defaultType === 2) return 'Cross Character';
		if (defaultType === 3) return 'True/False';
	})();
	$: questionData.update((data) => {
		if (defaultType != data[index].type) {
			if(data[index].type === 3){
				data[index].options = {
					optionA: '',
					optionB: '',
					optionC: '',
					optionD: ''
				};
			}
			data[index].type = defaultType;
			data[index].answers = {
				answerA: false,
				answerB: false,
				answerC: false,
				answerD: false
			};
		}
		return data;
	});
</script>

<Button class="text-slate-900 border bg-gray-200 hover:bg-gray-400">
	<Chevron>{typeOfQuestion}</Chevron></Button
>
<Dropdown class="w-48 p-3 space-y-1">
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfQuestion" bind:group={defaultType} value={0}>Multi Choice</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfQuestion" bind:group={defaultType} value={1}>Single Choice</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfQuestion" bind:group={defaultType} value={2}>Cross Character</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfQuestion" bind:group={defaultType} value={3}>True/False</Radio>
	</li>
</Dropdown>
