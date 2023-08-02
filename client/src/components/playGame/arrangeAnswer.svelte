<script lang="ts">
	import TrueFalseModal from '$components/trueFalseModal.svelte';
	import Icon from '@iconify/svelte';
	import { Modal } from 'flowbite-svelte';
	export let answer: any;
	export let showModal: boolean;
	export let isAnswerChecked: boolean;
	export let finalAnswer: string;
	export let isGuessWordsChecked: boolean;

	type CharacterObject = {
		char: string;
		id: number;
	};

	function scrambleString(str: string) {
		let chars = str.split('');

		for (let i = chars.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[chars[i], chars[j]] = [chars[j], chars[i]];
		}
		return chars.join('');
	}

	let answerSplit: string[];
	let newAnswer: string;
	let scrambledAnswer: string;
	let scrambledAnswerSplit: CharacterObject[];

	$: {
		answerSplit = answer.split('');
		newAnswer = answer;
		scrambledAnswer = scrambleString(newAnswer.toUpperCase());
		scrambledAnswerSplit = scrambledAnswer
			.split('')
			.map((char: string, id: number) => ({ char, id }));
	}

	let chooseAnswer: CharacterObject[] = [];
	let displayAnswer: CharacterObject[];

	function addToChooseAnswer(input: CharacterObject, index: number) {
		if (chooseAnswer.length < answerSplit.length) {
			chooseAnswer = [...chooseAnswer, input];

			scrambledAnswerSplit = [
				...scrambledAnswerSplit.slice(0, index),
				...scrambledAnswerSplit.slice(index + 1)
			];
		}
	}
	function removeChooseAnswer(input: CharacterObject, index: number) {
		if (chooseAnswer[index]) {
			chooseAnswer = [...chooseAnswer.slice(0, index), ...chooseAnswer.slice(index + 1)];

			const insertionIndex = scrambledAnswerSplit.findIndex(
				(charObj) => charObj.id > input.id
			);
			scrambledAnswerSplit = [
				...scrambledAnswerSplit.slice(0, insertionIndex),
				input,
				...scrambledAnswerSplit.slice(insertionIndex)
			];
		}
	}

	function checkAnswer(finalAnswer: string, answer: string) {
		if (finalAnswer === answer) {
			return true;
		} else {
			return false;
		}
	}

	$: {
		displayAnswer = answerSplit.map((char: string, id: number) => ({
			char: chooseAnswer[id] ? chooseAnswer[id].char : '',
			id: chooseAnswer[id] ? chooseAnswer[id].id : -1
		}));
	}

	$: {
		finalAnswer = chooseAnswer.map((obj) => obj.char).join('');
	}
	$: {
		if (!isAnswerChecked) {
			isGuessWordsChecked = true;
			chooseAnswer = [];
		}
	}
</script>

<div class="flex flex-col h-full gap-8">
	<div class="flex flex-col h-1/2 items-center">
		<div class="flex flex-wrap justify-center gap-2 bg-white p-2 md:p-4 rounded-xl">
			{#each displayAnswer as input, index}
				<button
					class=" w-14 h-16 flex justify-center items-center border-b-2 border-black"
					on:click={() => {
						removeChooseAnswer(input, index);
					}}
				>
					<p class="text-4xl">{input.char}</p>
				</button>
			{/each}
		</div>
	</div>
	<div class="flex flex-col h-1/2 items-center">
		<div class="flex flex-wrap justify-center gap-2">
			{#each scrambledAnswerSplit as input, index}
				<button
					class="p-3 w-14 h-16 rounded-lg border shadow-lg bg-secondary"
					on:click={() => {
						addToChooseAnswer(input, index);
					}}
				>
					<p class="text-4xl">{input.char}</p>
				</button>
			{/each}
		</div>
	</div>
</div>
{#if showModal}
	<TrueFalseModal bind:open={showModal} isTrue={checkAnswer(finalAnswer, answer)} />
{/if}
