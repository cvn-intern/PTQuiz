<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import type { SocketQuiz } from '../../../routes/(user)/(playGame)/playGame/[quizzesId]/play/quizzes.interface';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Modal } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import { tweened, type Tweened } from 'svelte/motion';
	import { EmitChannel, ListenChannel } from '$constants/socketChannel';
	export let showModal: boolean;
	export let question: SocketQuiz;
	export let socket: Socket;
	export let isPicked: boolean;
	export let timer: Tweened<number>;
	export let isTrueFalse: boolean;
	let fourOptions: any[] = [];
	let isLoading: boolean = false;
	let answers = [false, false, false, false];
	let score: number;
	$: {
		if (!isPicked) {
			answers = [false, false, false, false];
			fourOptions = Object.keys(question.options).map((optionKey, index) => ({
				id: optionKey,
				contents: question.options[optionKey],
				isCorrect: false,
				disabled: isPicked ? true : false
			}));
		}
	}
	let isCorrect: boolean = false;
	const pickAnswer = () => {
		socket.emit(ListenChannel.PICK_ANSWER, {
			roomPIN: $page.params.slug,
			answer: {
				questionId: question.id,
				writtenAnswer: '',
				givenAnswers: {
					answerA: answers[0],
					answerB: answers[1],
					answerC: answers[2],
					answerD: answers[3]
				}
			}
		});
	};
	onMount(() => {
		socket.on(EmitChannel.ANSWER_RESULT, (data) => {
			isCorrect = data.isCorrect;
			score = data.score;
			isPicked = true;
			isLoading = false;
			fourOptions = Object.keys(question.options).map((optionKey, index) => ({
				id: optionKey,
				contents: question.options[optionKey],
				isCorrect: data.answer[index],
				disabled: isLoading || isPicked ? true : false
			}));
			showModal = true;
			setTimeout(() => {
				showModal = false;
			}, 2000);
		});
	});
	$: {
		if ($timer <= 0 && !isPicked && !isLoading) {
			pickAnswer();
		}
	}
</script>

{#if isTrueFalse === false}
	{#each fourOptions as option, index}
		<button
			disabled={option.disabled}
			class={`rounded-xl flex p-2 md:p-4 gap-2 items-center text-gray-900 shadow-xl ${
				isPicked
					? option.isCorrect
						? 'bg-green-500'
						: answers[index]
						? 'bg-red-500'
						: 'bg-gray-200'
					: answers[index]
					? 'bg-blue-300'
					: isLoading
					? 'bg-gray-200'
					: 'bg-white'
			} ${option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
			on:click={() => {
				isLoading = true;
				timer = tweened(0);
				fourOptions = Object.keys(question.options).map((optionKey, index) => ({
					id: optionKey,
					contents: question.options[optionKey],
					isCorrect: false,
					disabled: isLoading || isPicked ? true : false
				}));
				answers[index] = true;
				pickAnswer();
			}}
		>
			<p class="text-xl md:text-3xl text-left">{option.contents}</p>
		</button>
	{/each}
{:else}
	{#each fourOptions.slice(0, 2) as option, index}
		<button
			disabled={option.disabled}
			class={`rounded-xl flex p-2 md:p-4 gap-2 items-center text-gray-900 shadow-xl ${
				isPicked
					? option.isCorrect
						? 'bg-green-500'
						: answers[index]
						? 'bg-red-500'
						: 'bg-gray-200'
					: answers[index]
					? 'bg-blue-300'
					: isLoading
					? 'bg-gray-200'
					: 'bg-white'
			} ${option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'} justify-center`}
			on:click={() => {
				isLoading = true;
				timer = tweened(0);
				fourOptions = Object.keys(question.options).map((optionKey, index) => ({
					id: optionKey,
					contents: question.options[optionKey],
					isCorrect: false,
					disabled: isLoading || isPicked ? true : false
				}));
				answers[index] = true;
				pickAnswer();
			}}
		>
			<p class="text-5xl flex justify-center">{option.contents}</p>
		</button>
	{/each}
{/if}

{#if showModal}
	<Modal bind:open={showModal} autoclose placement="top-center">
		<div class="flex justify-center items-center">
			{#if isCorrect}
				<Icon icon="flat-color-icons:ok" class="text-9xl" />
			{:else}
				<Icon icon="teenyicons:x-circle-solid" class="text-9xl text-red-500 " />
			{/if}
		</div>
	</Modal>
{/if}
