<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { QuizzesType, UserAnswer } from './quizzes.interface.js';
	import { gameInfoStore } from '../../../../libs/store/gameInfoStore.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Progressbar } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import Icon from '@iconify/svelte';
	import FourAnswer from '../../../../components/playGame/fourAnswer.svelte';
	import DisplayQuestion from '../../../../components/playGame/displayQuestion.svelte';
	export let data;

	const quizzes: QuizzesType = data.result;
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
	let selectedAnswerIndex: any = null;
	let sharedToastId: string | number;

	let givenAn: boolean[][] = new Array(quizzes.length).fill([]);
	givenAn = givenAn.map(() => new Array(4).fill(false));

	function nextQuestion() {
		selectedAnswerIndex = null;
		if (questionPointer < quizzes.length - 1) {
			if (!isAnswerChecked) {
				isAnswerChecked = true;
				timer = tweened(0);
			} else {
				questionPointer++;
				timer = tweened(original);
				isAnswerChecked = false;
			}
		}
	}

	function pickAnswer(id: string, index: number) {
		isAnswerChecked = true;
		givenAn[questionPointer][fourOptions.findIndex((opt) => opt.id === id)] = true;
		selectedAnswerIndex = index;
		timer = tweened(0);
	}

	const showLoadingToast = (): void => {
		sharedToastId = toast.loading('Loading...', { duration: 20000 });
	};

	const dismissLoadingToast = (): void => {
		toast.dismiss(sharedToastId);
	};

	async function submitQuiz() {
		try {
			isAnswerChecked = true;
			timer = tweened(0);

			const answerOfUser = givenAn.map((givenAnswers, index) => ({
				questionId: quizzes[index].id,
				givenAnswers: givenAnswers.join(',')
			}));

			const userAnswer: UserAnswer = {
				participantId: gameInfo.id,
				answerOfUser: answerOfUser
			};

			const confirm = await window.confirm('Are you sure you want to proceed?');
			if (!confirm) {
				return;
			}

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
		}
	}

	$: {
		if ($timer <= 0 && !isAnswerChecked) {
			isAnswerChecked = true;
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

<div class=" bg-greenLight flex flex-col justify-center w-full font-sans">
	<div class="px-4 md:px-16 py-6">
		<Progressbar progress={$timer.toString()} color="gray" />
	</div>
	<div class="flex justify-between px-4 py-4 md:px-16">
		<button
			class=" bg-red-700 text-xl rounded-2xl hover:bg-red-500 border"
			on:click={submitQuiz}
		>
			<Icon icon={'carbon:stop-outline'} class={'w-14 h-14 text-white'} />
		</button>
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
