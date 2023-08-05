<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import type { SocketQuiz } from '../../../routes/(user)/(playGame)/play-game/[quizzesId]/play/quizzes.interface';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { Modal } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import { tweened, type Tweened } from 'svelte/motion';
	import { EmitChannel, ListenChannel } from '$constants/socketChannel';
	import TrueFalseModal from '$components/trueFalseModal.svelte';
	export let showModal: boolean;
	export let question: SocketQuiz;
	export let socket: Socket;
	export let isPicked: boolean;
	export let timer: Tweened<number>;
	export let countDown: any;
	export let isHost: boolean;
	export let isBattle: boolean;

	let fourOptions: any[] = [];
	let answers = [false, false, false, false];
	let isSelecting: boolean = false;
	let score: number;
	$: {
		if (!isPicked) {
			isSelecting = true;
			answers = [false, false, false, false];
			fourOptions = Object.keys(question.options).map((optionKey, index) => ({
				id: optionKey,
				contents: question.options[optionKey],
				isCorrect: false,
				disabled: (!isBattle && isHost) || isPicked ? true : false
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
				disabled: isPicked ? true : false
			}));
			isSelecting = false;
			showModal = true;
			setTimeout(() => {
				showModal = false;
			}, 2000);
		});
	});
	$: {
		if ($timer <= 0 && !isPicked) {
			clearInterval(countDown);
			pickAnswer();
		}
	}
</script>

{#each fourOptions as option, index}
	<button
		disabled={option.disabled}
		class={`rounded-xl flex p-2 md:p-4 gap-2 items-center text-gray-900 shadow-xl ${
			isSelecting
				? answers[index]
					? ' bg-blue-300'
					: 'bg-white'
				: option.isCorrect
				? 'bg-green-500'
				: 'bg-red-500'
		} ${option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
		on:click={() => {
			answers[index] = !answers[index];
		}}
	>
		<p class="text-xl md:text-3xl text-left">{option.contents}</p>
	</button>
{/each}
{#if showModal && (!isHost || isBattle)}
	<TrueFalseModal bind:open={showModal} isTrue={isCorrect} />
{/if}
