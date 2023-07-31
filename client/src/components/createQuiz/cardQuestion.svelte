<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	export let questionStt: number;
	export let index: number;
	import { indexNow } from '$stores/indexNowStore';
	import { questionData } from '$stores/questionInfoStore';
	import { page } from '$app/stores';
	import { t } from '$i18n/translations';
	let effect = '';
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
		if (dataSave.length === 1) {
			alert('You must have at least one question');
			return;
		}
		if (confirm('Are you sure you want to delete this question?')) {
			const quizId = $page.params.quizId;
			const questionId = dataSave[index].id;

			if (questionId) {
				const response = await fetch(`/api/question/delete/${quizId}/${questionId}`, {
					method: 'DELETE'
				});

				const res = await response.json();

				if (!response.ok) {
					const message = `An error has occured: ${response.status}`;
					alert(message);
					return;
				}
			}

			questionData.update((data) => {
				data.splice(index, 1);

				if (index >= data.length) {
					index = data.length > 0 ? data.length - 1 : 0;
				}

				indexNow.set({
					index: index
				});

				return data;
			});
		}
	}

	$: indexNow.subscribe((data) => {
		if (questionStt - 1 === data.index) effect = 'border border-cyan-600';
		else effect = '';
	});
</script>

<Card padding="none">
	<div class="flex flex-col items-center py-4 {effect}">
		<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
			{$t('common.question')}
			{questionStt}
		</h5>
		<div class="flex mt-2 space-x-3 lg:mt-3">
			<Button class="border" on:click={deleteQuestion}
				><Icon icon={'iconamoon:trash-light'} class={'text-red-500 text-xl'} /></Button
			>
			<Button color="light" class="dark:text-white" on:click={editIndex}
				><Icon icon={'uil:edit'} class={'text-yellow-300 text-xl'} /></Button
			>
		</div>
	</div>
</Card>
