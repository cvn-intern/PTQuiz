<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { QuizzesType, UserAnswer } from './quizzes.interface.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button, Progressbar, Modal } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import Icon from '@iconify/svelte';
	import CryptoJS from 'crypto-js';
	import DisplayQuestion from '$components/playGame/displayQuestion.svelte';
	import FourAnswer from '$components/playGame/fourAnswer.svelte';
	import { gameInfoStore } from '$stores/gameInfoStore.js';
	export let data;

	const key = import.meta.env.VITE_CRYPTO_KEY;

	function decryptData(cipherText:any) {
		const bytes = CryptoJS.AES.decrypt(cipherText, key);
		const originalText = bytes.toString(CryptoJS.enc.Utf8);
		return JSON.parse(originalText);
	}

	let quizzes: QuizzesType = data.result;
	quizzes = decryptData(quizzes);
	console.log(quizzes);
	let quizzesId = $page.params.quizzesId;

	let gameInfo: any;
	gameInfoStore.subscribe((val) => (gameInfo = val));
	if (!gameInfo) window.location.href = `/playGame/${quizzesId}`;

	let original = 100;
	let intervalValue = original / 20;
	let timer = tweened(original);

	setInterval(() => {
		if ($timer > 0) $timer -= intervalValue;
	}, 100);

	let questionPointer = 0;
	let fourOptions: any[];
	let isAnswerChecked: boolean = false;
	let popupModal = false;
	let selectedAnswerIndex: any = null;
	let sharedToastId: string | number;
	let isSubmitting = false;

	let givenAn: boolean[][] = new Array(quizzes.length).fill([]);
	givenAn = givenAn.map(() => new Array(4).fill(false));

	function nextQuestion() {
		selectedAnswerIndex = null;
		isAnswerChecked = true;
	}

	function pickAnswer(id: string, index: number) {
		isAnswerChecked = true;
		selectedAnswerIndex = index;
		givenAn[questionPointer][fourOptions.findIndex((opt) => opt.id === id)] = true;
	}

	const showLoadingToast = (): void => {
		sharedToastId = toast.loading('Loading...', { duration: 20000 });
	};

	const dismissLoadingToast = (): void => {
		toast.dismiss(sharedToastId);
	};

	async function submitQuiz() {
		if (isSubmitting) return;

		try {
			isAnswerChecked = true;
			timer = tweened(0);
			isSubmitting = true;

			const answerOfUser = givenAn.map((givenAnswers, index) => ({
				questionId: quizzes[index].id,
				givenAnswers: givenAnswers.join(',')
			}));

			const userAnswer: UserAnswer = {
				participantId: gameInfo.id,
				answerOfUser: answerOfUser
			};

			showLoadingToast();
			const response = await fetch('/api/play-game/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userAnswer)
			});

			const result = await response.json();

			if (response.status === 200) {
				toast.success('Success!');
				goto(`/playGame/${quizzesId}/endGame`);
			} else {
				toast.error(result || 'Invalid submit');
			}

			dismissLoadingToast();
		} catch (error) {
			toast.error('An error occurred while submitting the quiz');
			dismissLoadingToast();
		} finally {
			isSubmitting = false;
		}
	}

	$: {
		if ($timer <= 0 && !isAnswerChecked) {
			isAnswerChecked = true;
		}
	}

	$: {
		if (isAnswerChecked === true) {
			timer = tweened(0);
			if (questionPointer < quizzes.length - 1) {
				setTimeout(() => {
					questionPointer++;
					timer = tweened(original);
					isAnswerChecked = false;
				}, 3000);
			} else {
				setTimeout(() => {
					submitQuiz();
				}, 3000);
			}
		}
	}

	$: fourOptions = quizzes[questionPointer]?.options.map((option, index) => ({
		id: String.fromCharCode(65 + index),
		color: `bg-option${String.fromCharCode(65 + index)}`,
		contents: option,
		isCorrect: quizzes[questionPointer].answers[index],
		disabled: isAnswerChecked ? true : false
	}));
</script>

<div class=" bg-greenLight h-screen flex flex-col justify-center w-full font-sans">
	<div class="px-4 md:px-16 py-6">
		<Progressbar progress={$timer.toString()} color="gray" />
	</div>
	<div class="flex justify-between px-4 py-4 md:px-16">
		<button
			class=" bg-red-700 text-xl rounded-2xl hover:bg-red-500 border"
			on:click={() => {
				popupModal = true;
			}}
		>
			<Icon icon={'carbon:stop-outline'} class={'w-14 h-14 text-white'} />
		</button>
		<Modal bind:open={popupModal} size="xs" autoclose>
			<div class="text-center">
				<svg
					aria-hidden="true"
					class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					Are you sure you want cancel this quizzes?
				</h3>
				<Button
					color="red"
					class="mr-2"
					on:click={() => {
						popupModal = false;
						isAnswerChecked = true;
						timer = tweened(0);
						goto(`/playGame/${quizzesId}`);
					}}>Yes, I'm sure</Button
				>
				<Button color="alternative">No, continue</Button>
			</div>
		</Modal>
		{#if questionPointer === quizzes.length - 1}
			<button
				class="px-4 bg-buttonHover text-xl rounded-2xl text-white hover:bg-optionB"
				on:click={submitQuiz}
			>
				Submit
			</button>
		{:else}
			<button
				on:click={nextQuestion}
				class=" bg-violet-900 text-xl rounded-2xl hover:bg-violet-600"
			>
				<Icon icon={'fluent:next-48-regular'} class={'w-14 h-14 text-white'} />
			</button>
		{/if}
	</div>
	<DisplayQuestion question={quizzes[questionPointer]} />
	<div class="answer px-4 md:px-16 py-8">
		<div class="grid grid-cols-2 grid-rows-2 gap-4 md:gap-8 min-h-[208px] items-center">
			{#each fourOptions as opt, index}
				<FourAnswer
					option={opt}
					{index}
					{isAnswerChecked}
					{selectedAnswerIndex}
					{pickAnswer}
				/>
			{/each}
		</div>
	</div>
</div>
