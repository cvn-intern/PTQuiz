<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import CardQuestion from './cardQuestion.svelte';
	import ModalInforQuizzes from './modalInforQuiz.svelte';
	import Icon from '@iconify/svelte';
	export let classSidaBar: any;
	import { questionData } from '$stores/questionInfoStore';
	function addQuestion() {
		const newQuestion ={
			categoryId: "",
			title: "",
			options: {
				optionA: "",
				optionB: "",
				optionC: "",
				optionD: "",
			},
			answers: {
				answerA: false,
				answerB: false,
				answerC: false,
				answerD: false,
			},
			written: "",
			image: "",
			type: 1,
			index: 1
		}	
		questionData.update((data) => [...data, newQuestion]);
	}
	let cardListQuestion: any;
	questionData.subscribe((data) => {
		cardListQuestion = data;
	});
</script>

<div class={classSidaBar}>
	<ModalInforQuizzes />
	<div
		class="md:max-h-boxCardQuestion max-h-96 overflow-y-scroll w-full flex flex-col gap-4 border p-4"
	>
		{#each cardListQuestion as cardQuestion, index}
			<CardQuestion questionStt={index + 1} index={index} />
		{/each}
	</div>
	<hr class="bg-gray-950" />
	<Button class="bg-secondary text-white hover:bg-darkGreen" on:click={addQuestion}> 
		<Icon icon={'gridicons:add-outline'} class="text-xl mr-3" />
		Add Question
	</Button>
</div>
