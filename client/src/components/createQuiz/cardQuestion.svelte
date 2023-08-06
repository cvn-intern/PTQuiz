<script lang="ts">
	import { Card, Button, Modal } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	export let questionStt: number;
	export let index: number;
	export let isEmptyQuiz: boolean;
	export let disabled: boolean;

	import { indexNow } from '$stores/indexNowStore';
	import { questionData } from '$stores/questionInfoStore';
	import { page } from '$app/stores';
	import { t } from '$i18n/translations';
	let effect = '';
	let isSubmitting: boolean = false;
	let isDisabled: boolean = false;
	let popupModalCannotDelete = false;
	let popupModalCanDelete = false;
	function editIndex() {
		indexNow.set({
			index: index
		});
	}

	let dataSave: any;
	questionData.subscribe((data) => {
		dataSave = data;
	});

	async function deleteQuestion() {
		isSubmitting = true;
		isDisabled = true;
		setTimeout(() => {
			isDisabled = false;
		}, 3000);
		const quizId = $page.params.quizId;
		const questionId = dataSave[index].id;

		if (questionId) {
			const response = await fetch(`/api/question/delete/${quizId}/${questionId}`, {
				method: 'DELETE'
			});

			const res = await response.json();

			isSubmitting = false;

			if (!response.ok) {
				const message = `An error has occured: ${response.status}`;
				alert(message);
				return;
			}
		}

		questionData.update((data) => {
			if (data.length === 1) {
				isEmptyQuiz = true;
				disabled = false;
				data = [
					{
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
					}
				];
			} else data.splice(index, 1);

			if (index >= data.length) {
				index = data.length > 0 ? data.length - 1 : 0;
			}

			indexNow.set({
				index: index
			});

			return data;
		});
	}

	$: indexNow.subscribe((data) => {
		if (questionStt - 1 === data.index) effect = 'border border-cyan-600 border-4';
		else effect = '';
	});
	function handleDelete() {
		popupModalCanDelete = true;
		popupModalCannotDelete = false;
	}
</script>

<Card padding="none">
	<div class="flex flex-col items-center py-2 {effect}  ">
		<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
			{$t('common.question')}
			{questionStt}
		</h5>
		<div class="flex mt-2 gap-1 lg:mt-3">
			<Button class="border p-2" on:click={handleDelete} disabled={isSubmitting || isDisabled}
				><Icon icon={'iconamoon:trash-light'} class={'text-red-500 text-xl'} /></Button
			>
			<Button
				color="light"
				class="dark:text-white p-2"
				on:click={editIndex}
				disabled={isSubmitting || isDisabled}
				><Icon icon={'uil:edit'} class={'text-yellow-300 text-xl'} /></Button
			>
		</div>
	</div>
</Card>

<Modal bind:open={popupModalCannotDelete} size="xs" autoclose>
	<div class="text-center">
		<svg
			aria-hidden="true"
			class="mx-auto mb-4 w-14 h-14 text-red-400 dark:text-red-400"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			{$t('common.canNotDeleteQuestion')}
		</h3>
		<Button color="green">OK</Button>
	</div>
</Modal>

<Modal bind:open={popupModalCanDelete} size="xs" autoclose>
	<div class="text-center">
		<svg
			aria-hidden="true"
			class="mx-auto mb-4 w-14 h-14 text-red-400 dark:text-red-400"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			{$t('common.confirmDelete')}
		</h3>
		<Button color="red" class="mr-2" on:click={deleteQuestion}
			>{$t('common.acceptDeleteQuiz')}</Button
		>
		<Button color="green">{$t('common.cancelDeleteQuiz')}</Button>
	</div>
</Modal>
