<script lang="ts">
	import TrueFalseModal from '$components/trueFalseModal.svelte';
	import { onMount } from 'svelte';
	export let answer: any;
	export let showModal: boolean;
	export let isAnswerChecked: boolean;
	export let finalAnswer: string;
	export let isGuessWordsChecked: boolean;
	export let pickGuessWords: (finalAnswer: string) => void;

	type CharacterObject = {
		char: string;
		id: number;
	};

	let answerSplit: string[];

	$: {
		answerSplit = answer.split('');
	}

	let chooseAnswer: CharacterObject[] = [];
	let displayAnswer: CharacterObject[];
	let textInput: any;

	onMount(() => {
		textInput.focus();
	});
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
			id: id
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

	function handleInput(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
		id: number
	) {
		const inputElement = event.target as HTMLInputElement;
		const inputValue = inputElement.value;

		if (inputValue.length === 1) {
			if (chooseAnswer.length < answerSplit.length) {
				chooseAnswer = [...chooseAnswer, { char: inputValue.toUpperCase(), id }];
			}

			const nextInput = inputElement.nextElementSibling as HTMLInputElement;
			if (nextInput) {
				nextInput.focus();
			}
		} else if (inputValue.length === 0) {
			const indexToRemove = chooseAnswer.findIndex((item) => item.id === id);
			if (indexToRemove !== -1) {
				chooseAnswer = [
					...chooseAnswer.slice(0, indexToRemove),
					...chooseAnswer.slice(indexToRemove + 1)
				];
			}
		}
	}

	function handleKeyDown(event: KeyboardEvent, id: number) {
		const inputElement = event.target as HTMLInputElement;
		const inputValue = inputElement.value;
		if ((event.key === 'Backspace' || event.key === 'Delete') && inputValue === '') {
			const previousInput = inputElement.previousElementSibling as HTMLInputElement;
			if (previousInput) {
				previousInput.focus();
			}
		}
		if (inputValue.length === 1 && event.key != 'Backspace' && event.key != 'Delete') {
			if (chooseAnswer.length < answerSplit.length) {
				chooseAnswer = [...chooseAnswer, { char: inputValue.toUpperCase(), id }];
			}
			const nextInput = inputElement.nextElementSibling as HTMLInputElement;
			if (nextInput) {
				nextInput.focus();
			}
		}
		if (event.key === 'Enter') {
			showModal = true;

			pickGuessWords(finalAnswer);
			setTimeout(() => {
				showModal = false;
			}, 2000);
		}
	}
</script>

<div class="flex flex-col h-full gap-8">
	<div class="flex flex-col items-center">
		<div class="flex flex-wrap justify-center gap-2 bg-white p-2 md:p-4 rounded-xl">
			{#each displayAnswer as input, index}
				{#if index === 0}
					<input
						type="text"
						class="w-14 h-16 border-b-2 border-b-black text-4xl border-transparent focus:border-transparent focus:border-b-2 focus:border-b-green-500 focus:ring-0 uppercase"
						value={input.char}
						maxlength="1"
						on:input={(event) => handleInput(event, input.id)}
						on:keydown={(event) => handleKeyDown(event, input.id)}
						bind:this={textInput}
					/>
				{:else}
					<input
						type="text"
						class="w-14 h-16 border-b-2 border-b-black text-4xl border-transparent focus:border-transparent focus:border-b-2 focus:border-b-green-500 focus:ring-0 uppercase"
						value={input.char}
						maxlength="1"
						on:input={(event) => handleInput(event, input.id)}
						on:keydown={(event) => handleKeyDown(event, input.id)}
					/>
				{/if}
			{/each}
		</div>
	</div>
</div>

{#if showModal}
	<TrueFalseModal bind:open={showModal} isTrue={checkAnswer(finalAnswer, answer)} />
{/if}
