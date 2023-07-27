<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Modal } from 'flowbite-svelte';
	export let answer: any;
	export let showModal: boolean;
	export let isAnswerChecked: boolean;
	export let finalAnswer: string;
	export let isGuessWordsChecked: boolean;

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
			isGuessWordsChecked = true;
			chooseAnswer = [];
		}
	}
</script>

<div class="flex flex-col h-full">
	<div class="flex flex-col h-1/2 items-center gap-4">
		<div
			class={`flex flex-start h-20 gap-2 p-4 border border-black rounded-lg items-center bg-background `}
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
		<div class="flex justify-center items-center">
			{#if checkAnswer(finalAnswer, answer)}
				<Icon icon="flat-color-icons:ok" class="text-9xl" />
			{:else}
				<Icon icon="teenyicons:x-circle-solid" class="text-9xl text-red-500" />
			{/if}
		</div>
	</Modal>
{/if}
