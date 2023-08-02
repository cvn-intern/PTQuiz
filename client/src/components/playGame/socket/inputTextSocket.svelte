<script lang="ts">
	import type { SocketQuiz } from '../../../routes/(user)/(playGame)/playGame/[quizzesId]/play/quizzes.interface';
	import type { Socket } from 'socket.io-client';
	import { EmitChannel, ListenChannel } from '../../../libs/constants/socketChannel';
	import { onMount } from 'svelte';
	import { tweened, type Tweened } from 'svelte/motion';
	import CryptoJS from 'crypto-js';
	import Loading from '../../loading.svelte';
	import { page } from '$app/stores';
	import TrueFalseModal from '$components/trueFalseModal.svelte';

	let answer: string = '';
	let finalAnswer: string;
	let isGetAnswer: boolean = false;
	let isCorrect: boolean = false;
	let isDisable: boolean = false;
	let score: number;
	export let showModal: boolean;
	export let question: SocketQuiz;
	export let socket: Socket;
	export let isPicked: boolean;
	export let timer: Tweened<number>;

	const key = import.meta.env.VITE_CRYPTO_KEY;

	function decryptData(cipherText: any) {
		const bytes = CryptoJS.AES.decrypt(cipherText, key);
		const originalText = bytes.toString(CryptoJS.enc.Utf8);
		return JSON.parse(originalText);
	}
	type CharacterObject = {
		char: string;
		id: number;
	};
	$: {
		if (!isPicked) {
			isDisable = false;
			isGetAnswer = false;
			chooseAnswer = [];
			socket.emit(ListenChannel.GET_ANSWER_QUESTION, {
				questionId: question.id
			});
		}
	}
	onMount(() => {
		socket.on(EmitChannel.ANSWER_QUESTION, (data) => {
			answer = decryptData(data).written as string;
			isGetAnswer = true;
		});
		socket.on(EmitChannel.ANSWER_RESULT, (data) => {
			isCorrect = data.isCorrect;
			score = data.score;
			isPicked = true;
			showModal = true;
			setTimeout(() => {
				showModal = false;
			}, 2000);
		});
	});
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
		if (isGetAnswer) {
			answerSplit = answer.split('');
			newAnswer = answer;
			scrambledAnswer = scrambleString(newAnswer);
			scrambledAnswerSplit = scrambledAnswer
				.split('')
				.map((char: string, id: number) => ({ char, id }));
		}
	}

	let chooseAnswer: CharacterObject[] = [];
	let displayAnswer: CharacterObject[];

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
			timer = tweened(0);
			pickAnswer();
		}
	}

	$: {
		if (isGetAnswer) {
			displayAnswer = answerSplit.map((char: string, id: number) => ({
				char: '',
				id: -1
			}));
		}
	}

	$: {
		finalAnswer = chooseAnswer.map((obj) => obj.char).join('');
	}

	const pickAnswer = () => {
		isDisable = true;
		socket.emit(ListenChannel.PICK_ANSWER, {
			roomPIN: $page.params.slug,
			answer: {
				questionId: question.id,
				writtenAnswer: finalAnswer,
				givenAnswers: {
					answerA: false,
					answerB: false,
					answerC: false,
					answerD: false
				}
			}
		});
	};
	$: {
		if ($timer <= 0 && !isPicked && !isDisable) {
			pickAnswer();
		}
	}

	$: console.log(chooseAnswer);
</script>

{#if isGetAnswer}
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
			<div
				class={`${
					isDisable ? 'bg-gray-200' : 'bg-white'
				} flex flex-wrap justify-center gap-2 p-2 md:p-4 rounded-xl`}
			>
				{#each displayAnswer as input}
					<input
						disabled={isDisable}
						type="text"
						class={`${isDisable ?'bg-gray-200' : 'bg-white'} w-14 h-16 border-b-2 border-b-black text-4xl border-transparent focus:border-transparent focus:border-b-2 focus:border-b-green-500 focus:ring-0 uppercase`}
						value={input.char}
						maxlength="1"
						on:input={(event) => handleInput(event, input.id)}
						on:keydown={(event) => handleKeyDown(event, input.id)}
					/>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<div class="flex justify-center items-center">
		<Loading />
	</div>
{/if}

{#if showModal}
	<TrueFalseModal bind:open={showModal} isTrue={isCorrect} />
{/if}
