<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import CardQuestion from './cardQuestion.svelte';
	import Icon from '@iconify/svelte';
	import ModalInforQuizUpdate from './modalInforQuizUpdate.svelte';
	import { dismissLoadingToast, showLoadingToast, showToast } from '$libs/toast/toast';
	export let classSidaBar: any;
	import { questionData } from '$stores/questionInfoStore';
	import { indexNow } from '$stores/indexNowStore';
	import { t } from '$i18n/translations';
	let isQuestionSave = true;
	let isDisabled: boolean = false;
	function addQuestion() {
		isDisabled = true;
		questionData.subscribe((data) => {
			data.forEach((element) => {
				if (element.id === '') {
					isQuestionSave = false;
					return;
				} else {
					isQuestionSave = true;
				}
			});
		});

		if (!isQuestionSave) {
			showToast('error', $t('validation.SAVE_ALL_BEFORE_ADD_QUESTION'));
			setTimeout(() => {
				isDisabled = false;
			}, 3000);
			return;
		}
		indexNow.update((data) => {
			let questionCount;
			questionData.subscribe((data) => {
				questionCount = data.length;
			});
			data.index = questionCount;
			return data;
		});
		const newQuestion = {
			id: '',
			categoryId: '',
			title: '',
			options: {
				optionA: '',
				optionB: '',
				optionC: '',
				optionD: ''
			},
			answers: {
				answerA: false,
				answerB: false,
				answerC: false,
				answerD: false
			},
			written: '',
			image: '',
			type: 1,
			index: 1,
			time: 20,
			hint: ''
		};
		questionData.update((data) => [...data, newQuestion]);
		setTimeout(() => {
			isDisabled = false;
		}, 3000);
	}
	let cardListQuestion: any;
	questionData.subscribe((data) => {
		cardListQuestion = data;
	});
	export let result: any;
	export let form: any;
</script>

<div class={classSidaBar}>
	<ModalInforQuizUpdate
		bind:result
		defaultOpenModal={false}
		classButton={'"w-2/3 h-10 text-zinc-950 border bg-gray-200 hover:bg-gray-400"'}
		nameClassButton={$t('common.updateQuiz')}
		{form}
	/>
	<div
		class="md:max-h-boxCardQuestion max-h-96 overflow-y-scroll w-full flex flex-col gap-4 border p-4 no-scrollbar"
	>
		{#each cardListQuestion as cardQuestion, index}
			<CardQuestion questionStt={index + 1} {index} />
		{/each}
	</div>
	<hr class="bg-gray-950" />
	<Button
		class="bg-secondary text-white hover:bg-darkGreen"
		on:click={addQuestion}
		disabled={isDisabled}
	>
		<Icon icon={'gridicons:add-outline'} class="text-xl mr-3" />
		{$t('common.addQuestion')}
	</Button>
</div>
