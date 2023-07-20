<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { Quizzes, UserAnswer } from './quizzes.interface.js';
	import { gameInfoStore } from '../../../../libs/store/gameInfoStore.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Progressbar } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	export let data: { result: Quizzes };

	const quizzes: Quizzes = data.result;
	let quizzesId = $page.params.quizzesId;

	let gameInfo: any;
	gameInfoStore.subscribe((val) => (gameInfo = val));
	if (!gameInfo) window.location.href = `/playGame/${quizzesId}`;

	let realtime = 20;
	let original = 100;
	let intervalValue = original / realtime;
	let timer = tweened(original);

	setInterval(() => {
		if ($timer > 0) $timer -= intervalValue;
	}, 100);

	let questionPointer = 0;
	let options: any[];

	let isAnswerChecked: boolean = false;

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

	let selectedAnswerIndex: any = null;

	function pickAnswer(id: string, index: number) {
		isAnswerChecked = true;
		givenAn[questionPointer][options.findIndex((opt) => opt.id === id)] = true;
		selectedAnswerIndex = index;
		timer = tweened(0);
	}

	let sharedToastId: string | number;

	const showLoadingToast = (): void => {
		sharedToastId = toast.loading('Loading...', { duration: 20000 });
	};

	const dismissLoadingToast = (): void => {
		toast.dismiss(sharedToastId);
	};

	async function submitQuiz() {
		isAnswerChecked = true;
		timer = tweened(0);

		const answerOfUser = givenAn.map((givenAn, index) => {
			const questionId = quizzes[index].id;
			return {
				questionId,
				givenAn: givenAn
			};
		});

		const formattedData = answerOfUser.map((item) => ({
			questionId: item.questionId,
			givenAnswers: item.givenAn.join(',')
		}));

		const userAnswer: UserAnswer = {
			participantId: gameInfo.id,
			answerOfUser: formattedData
		};
		const confirm = await window.confirm('Are you sure you want to proceed?');
		if (confirm) {
			showLoadingToast();
			const response = await fetch('/api/quizzes/play-game/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userAnswer)
			});

			const result = await response.json();

			if (response.status === 200) {
				dismissLoadingToast();
				toast.success('Success!');
				window.location.href = `/playGame/${quizzesId}/endGame`;
			} else {
				toast.error(result || 'Invalid submit');
				dismissLoadingToast();
			}
		}
	}

	$: {
		if ($timer <= 0 && !isAnswerChecked) {
			isAnswerChecked = true;
		}
	}

	$: options = [
		{
			id: 'A',
			color: 'bg-optionA',
			contents: quizzes[questionPointer].options[0],
			isCorrect: quizzes[questionPointer].answers[0],
			disabled: isAnswerChecked ? true : false
		},
		{
			id: 'B',
			color: 'bg-optionB',
			contents: quizzes[questionPointer].options[1],
			isCorrect: quizzes[questionPointer].answers[1],
			disabled: isAnswerChecked ? true : false
		},
		{
			id: 'C',
			color: 'bg-optionC',
			contents: quizzes[questionPointer].options[2],
			isCorrect: quizzes[questionPointer].answers[2],
			disabled: isAnswerChecked ? true : false
		},
		{
			id: 'D',
			color: 'bg-optionD',
			contents: quizzes[questionPointer].options[3],
			isCorrect: quizzes[questionPointer].answers[3],
			disabled: isAnswerChecked ? true : false
		}
	];
</script>

<div class=" bg-greenLight flex flex-col justify-center w-full">
	<div class="px-4 md:px-16 py-6">
		<Progressbar progress={$timer.toString()} color="gray" />
	</div>
	<div class="flex justify-between px-4 py-4 md:px-16">
		<button class="px-4 bg-red-500 text-xl rounded-2xl" on:click={submitQuiz}>End Game</button>
		{#if questionPointer === quizzes.length - 1}
			<button
				class="px-4 bg-buttonHover text-xl rounded-2xl text-white"
				on:click={submitQuiz}
			>
				Submit
			</button>
		{:else}
			<button
				on:click={nextQuestion}
				class="px-4 bg-buttonHover text-xl rounded-2xl text-white"
			>
				Next Question
			</button>
		{/if}
	</div>
	<div class="question px-8 md:px-32">
		<div class="px-4 py-2 bg-secondary min-h-[208px] rounded-3xl">
			<h1 class="px-4 text-4xl text-white font-bold">Question</h1>
			<p class="p-2 text-2xl text-white">{quizzes[questionPointer].title}</p>
		</div>
	</div>
	<div class="answer px-4 md:px-16 py-8">
		<div class="grid grid-cols-2 grid-rows-2 gap-4 md:gap-8 min-h-[208px]">
			{#each options as opt, index}
				<button
					on:click={() => pickAnswer(opt.id, index)}
					class={`rounded-2xl flex p-2 md:p-4 gap-2 ${
						isAnswerChecked
							? opt.isCorrect
								? 'bg-green-500'
								: selectedAnswerIndex === index
								? 'bg-red-500'
								: 'bg-gray-200'
							: opt.color
					}`}
					disabled={opt.disabled}
				>
					<div class="rounded-full">
						<button
							class="bg-buttonAnswer rounded-full text-white w-8 h-8 md:w-12 md:h-12 text-2xl md:text-3xl"
						>
							{opt.id}
						</button>
					</div>
					<p class="text-sm md:text-xl font-semibold text-left">{opt.contents}</p>
				</button>
			{/each}
		</div>
	</div>
</div>
