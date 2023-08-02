<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Modal } from 'flowbite-svelte';
	import type { SocketQuiz } from '../../../routes/(user)/(playGame)/playGame/[quizzesId]/play/quizzes.interface';
	import type { Socket } from 'socket.io-client';
	import { EmitChannel, ListenChannel } from '../../../libs/constants/socketChannel';
	import { onMount } from 'svelte';
	import type { Tweened } from 'svelte/motion';
	import CryptoJS from 'crypto-js';
	import Loading from '../../loading.svelte';
	import { page } from '$app/stores';

	let answer: string = '';
	let finalAnswer: string;
	let isGetAnswer: boolean = false;
	let isCorrect: boolean = false;
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
		if (isGetAnswer) {
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

	$: {
		if (isGetAnswer) {
			displayAnswer = answerSplit.map((char: string, id: number) => ({
				char: chooseAnswer[id] ? chooseAnswer[id].char : '',
				id: chooseAnswer[id] ? chooseAnswer[id].id : -1
			}));
		}
	}

	$: {
		finalAnswer = chooseAnswer.map((obj) => obj.char).join('');
	}

	const pickAnswer = () => {
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
		if ($timer <= 0 && !isPicked) {
			pickAnswer();
		}
	}
</script>

{#if isGetAnswer}
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
{:else}
	<div class="flex justify-center items-center">
		<Loading />
	</div>
{/if}

{#if showModal}
	<Modal bind:open={showModal} autoclose>
		<div class="flex justify-center items-center">
			{#if isCorrect}
				<Icon icon="flat-color-icons:ok" class="text-9xl" />
			{:else}
				<Icon icon="teenyicons:x-circle-solid" class="text-9xl text-red-500" />
			{/if}
		</div>
	</Modal>
{/if}