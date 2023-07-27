<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	export let answer: any;
	export let showModal: boolean;
	export let isAnswerChecked: boolean;
	export let finalAnswer: string;
	export let isEssayChecked: boolean;

	function scrambleString(str: string) {
		let chars = str.split('');

		for (let i = chars.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[chars[i], chars[j]] = [chars[j], chars[i]];
		}
		return chars.join('');
	}

	function getRandomCharacter() {
		const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const randomIndex = Math.floor(Math.random() * characters.length);
		return characters[randomIndex];
	}

	type CharacterObject = {
		char: string;
		id: number;
	};

	let answerSplit: string[];
	let newAnswer: string;
	let scrambledAnswer: string;
	let scrambledAnswerSplit: CharacterObject[];
	let width: number;
	let first: boolean = true;

	$: {
		answerSplit = answer.split('');
		newAnswer = answer;
		for (let i = 0; i < 5; i++) {
			newAnswer += getRandomCharacter();
		}
		scrambledAnswer = scrambleString(newAnswer);
		scrambledAnswerSplit = scrambledAnswer
			.split('')
			.map((char: string, id: number) => ({ char, id }));
		width = 56 * answerSplit.length + 8 * (answerSplit.length - 1) + 36;
	}

	let chooseAnswer: CharacterObject[] = [];

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
		chooseAnswer = [...chooseAnswer.slice(0, index), ...chooseAnswer.slice(index + 1)];
		scrambledAnswerSplit = [
			...scrambledAnswerSplit.slice(0, input.id),
			input,
			...scrambledAnswerSplit.slice(input.id)
		];
	}

	function checkAnswer(finalAnswer: string, answer: string) {
		if (finalAnswer === answer) {
			return true;
		} else {
			return false;
		}
	}
	$: {
		finalAnswer = chooseAnswer.map((obj) => obj.char).join('');
	}
	$: {
		if (!isAnswerChecked) {
			isEssayChecked = true;
			first = true;
			chooseAnswer = [];
		}
	}
</script>

<div class="flex flex-col h-full">
	<div class="flex flex-col h-1/2 items-center gap-4">
		<div
			class={`flex flex-start flex-wrap gap-2 p-4 border border-black rounded-lg items-center bg-background ${
				first ? ' h-16' : ''
			}`}
			style="width:{width}px"
		>
			{#each chooseAnswer as input, index}
				<button
					class=" w-14 h-16 flex justify-center items-center rounded-lg border shadow-lg bg-secondary"
					on:click={() => {
						removeChooseAnswer(input, index);
					}}
				>
					<p class="text-4xl">{input.char}</p>
				</button>
			{/each}
		</div>
	</div>
	<div class="flex h-1/2 items-center justify-center">
		<div class="flex flex-wrap justify-center gap-2">
			{#each scrambledAnswerSplit as input, index}
				<button
					class="p-3 w-14 h-16 rounded-lg border shadow-lg bg-secondary"
					on:click={() => {
						if (first) {
							first = false;
						}
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
	<Modal bind:open={showModal} autoclose placement="top-center">
		<div class="">
			{#if checkAnswer(finalAnswer, answer)}
				<svg
					aria-hidden="true"
					class="mx-auto mb-4 w-14 h-14 text-green-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					Correct Answer!
				</h3>
			{:else}
				<svg
					aria-hidden="true"
					class="mx-auto mb-4 w-14 h-14 text-red-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
				<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					Wrong Answer! Try Better Next Time.
				</h3>
			{/if}
		</div>
	</Modal>
{/if}
