<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import type { Quiz } from '../../../routes/(user)/(playGame)/playGame/[quizzesId]/play/quizzes.interface';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { Modal } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import { tweened, type Tweened } from 'svelte/motion';
	export let showModal: boolean;
	export let question: Quiz;
	export let socket: Socket;
	export let user: any;
	export let isHost: boolean;
	export let isPicked: boolean;
	export let timer: Tweened<number>;
	let fourOptions: any[] = [];

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
		socket.emit('pick-answer', {
			roomPIN: $page.params.slug,
			userId: user.id,
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
		socket.on('answer-result', (data) => {
			isCorrect = data.isCorrect;
			score = data.score;
			isPicked = true;
			fourOptions = Object.keys(question.options).map((optionKey, index) => ({
				id: optionKey,
				contents: question.options[optionKey],
				isCorrect: data.answer[index],
				disabled: isPicked ? true : false
			}));
			timer = tweened(0);
			showModal = true;
			setTimeout(() => {
				showModal = false;
			}, 2000);
		});
	});
	$: {
		if ($timer <= 0 && !isPicked) {
			console.log('time out');
			pickAnswer();
		}
	}
</script>

{#each fourOptions as option, index}
	<button
		disabled={option.disabled}
		class={`h-10 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-xl ${
			isPicked
				? option.isCorrect
					? 'bg-green-500'
					: answers[index]
					? 'bg-red-500'
					: 'bg-gray-200'
				: 'bg-white'
		} ${option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
		on:click={() => {
			answers[index] = true;
			pickAnswer();
		}}>{option.contents}</button
	>
{/each}

{#if showModal}
	<Modal bind:open={showModal} autoclose placement="top-center">
		<div class="flex justify-center items-center">
			{#if isCorrect}
				<Icon icon="flat-color-icons:ok" class="text-9xl" />
				+{score}
			{:else}
				<Icon icon="teenyicons:x-circle-solid" class="text-9xl text-red-500 " />
			{/if}
		</div>
	</Modal>
{/if}
