<script lang="ts">
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

	function getRandomCharacter() {
		const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const randomIndex = Math.floor(Math.random() * characters.length);
		return characters[randomIndex];
	}

	let answerSplit: string[];
	let newAnswer: string;
	let scrambledAnswer: string;
	let scrambledAnswerSplit: CharacterObject[];

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
	}

	let chooseAnswer: CharacterObject[] = [];
	let displayAnswer: CharacterObject[];

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

	function handleInput(event: InputEvent, id: number) {
		const inputElement = event.target as HTMLInputElement;
		const inputLength = inputElement.value.length;

		if (inputLength === 1) {
			const nextInput = inputElement.nextElementSibling as HTMLInputElement;
			if (nextInput) {
				nextInput.focus();
			}
		}

		if (inputLength === 0) {
			const previousInput = inputElement.previousElementSibling as HTMLInputElement;
			if (previousInput) {
				previousInput.focus();
			}
		}
	}
</script>

<div class="flex flex-col h-full gap-8">
	<div class="flex flex-col h-1/2 items-center">
		<div class="flex flex-wrap justify-center gap-2">
			{#each scrambledAnswerSplit as input}
				<button class="p-3 w-14 h-16 rounded-lg border shadow-lg bg-secondary">
					<p class="text-4xl">{input.char}</p>
				</button>
			{/each}
		</div>
	</div>
	<div class="flex flex-col h-1/2 items-center">
		<div class="flex flex-wrap justify-center gap-2 bg-white p-2 md:p-4 rounded-xl">
			{#each displayAnswer as input}
				<input
					type="text"
					class="w-14 h-16 flex justify-center items-center border- text-4xl"
					value={input.char}
					maxlength="1"
					on:input={(e) => handleInput(e, input.id)}
				/>
			{/each}
		</div>
	</div>
</div>
{#if showModal}
	<Modal bind:open={showModal} autoclose>
		<div class="flex justify-center items-center">
			{#if checkAnswer(finalAnswer, answer)}
				<Icon icon="flat-color-icons:ok" class="text-9xl" />
			{:else}
				<Icon icon="teenyicons:x-circle-solid" class="text-9xl text-red-500" />
			{/if}
		</div>
	</Modal>
{/if}
