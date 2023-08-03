<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import type { SocketQuiz } from '../../../routes/(user)/(playGame)/playGame/[quizzesId]/play/quizzes.interface';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Modal } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import { EmitChannel, ListenChannel } from '$constants/socketChannel';
	import TrueFalseModal from '$components/trueFalseModal.svelte';
	import type { Tweened } from 'svelte/motion';
	export let showModal: boolean;
	export let question: SocketQuiz;
	export let socket: Socket;
	export let isPicked: boolean;
	export let timer: Tweened<number>;
	export let isShowOption: boolean;
	let fourOptions: any[] = [];
	let isLoading: boolean = false;
	let answers = [false, false, false, false];
	let score: number;
	let isTimeOut: boolean = false;
	$: {
		if (!isPicked) {
			answers = [false, false, false, false];
			isTimeOut = false;
			isLoading = false;
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
			fourOptions = Object.keys(question.options).map((optionKey, index) => ({
				id: optionKey,
				contents: question.options[optionKey],
				isCorrect: data.answer[index],
				disabled: isLoading || isPicked ? true : false
			}));
			showModal = true;
		});
	});
	$: {
		if ($timer <= 0 && !isPicked && !isLoading && isShowOption) {
			isTimeOut = true;
			pickAnswer();
		} else if ($timer <= 0 && isPicked) {
			isTimeOut = true;
			setTimeout(() => {
				showModal = false;
			}, 2000);
		}
	}
</script>

{#if isShowOption}
	{#each fourOptions as option, index}
		<button
			disabled={option.disabled}
			class={`rounded-xl flex p-2 md:p-4 gap-2 items-center text-gray-900 shadow-xl ${
				isPicked && isTimeOut
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
{/if}

{#if showModal && isTimeOut}
	<TrueFalseModal bind:open={showModal} isTrue={isCorrect} />
{/if}
