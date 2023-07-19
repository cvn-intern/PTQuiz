<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';
	import { tweened } from 'svelte/motion';
	import type { Quizzes, Quiz } from './quizzes.interface.js';

	export let data: { result: Quizzes };
	const quizzes: Quizzes = data.result;

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
		if (!isAnswerChecked) {
			isAnswerChecked = true;
		} else {
			questionPointer++;
			timer = tweened(original);
			isAnswerChecked = false;
		}
	}

	function pickAnswer(id: string) {
		isAnswerChecked = true;
		givenAn[questionPointer][options.findIndex((opt) => opt.id === id)] = true;
	}

	function submitQuiz() {
		nextQuestion();
		console.log(givenAn);
	}

	$: {
		if ($timer <= 0 && !isAnswerChecked) {
			isAnswerChecked = true;
		}
	}

	$: options = [
		{
			id: 'A',
			contents: quizzes[questionPointer].options[0],
			color: 'bg-optionA',
			isCorrect: quizzes[questionPointer].answers[0]
		},
		{
			id: 'B',
			contents: quizzes[questionPointer].options[1],
			color: 'bg-optionB',
			isCorrect: quizzes[questionPointer].answers[1]
		},
		{
			id: 'C',
			contents: quizzes[questionPointer].options[2],
			color: 'bg-optionC',
			isCorrect: quizzes[questionPointer].answers[2]
		},
		{
			id: 'D',
			contents: quizzes[questionPointer].options[3],
			color: 'bg-optionD',
			isCorrect: quizzes[questionPointer].answers[3]
		}
	];
</script>

<div class=" bg-greenLight flex flex-col justify-center w-full">
	<div class="px-4 md:px-16 py-6">
		<Progressbar progress={$timer.toString()} color="gray" />
	</div>
	<div class="flex justify-between px-4 py-4 md:px-16">
		<button class="px-4 bg-red-500 text-xl rounded-2xl">End Game</button>
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
			{#each options as opt}
				<button
					on:click={() => pickAnswer(opt.id)}
					class={`rounded-2xl flex p-2 md:p-4 gap-2 ${
						isAnswerChecked
							? opt.isCorrect
								? 'bg-green-500'
								: 'bg-gray-200'
							: opt.color
					}`}
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
