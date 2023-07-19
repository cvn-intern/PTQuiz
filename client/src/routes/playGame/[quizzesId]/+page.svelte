<script lang="ts">
	interface Question {
		question: string;
		options: string[];
		correctIndex: number;
	}
	import { Progressbar } from 'flowbite-svelte';
	import { tweened } from 'svelte/motion';
	import type { Quizzes } from './quizzes.interface.js';
	import Quiz from '../../../components/quizzes/quiz.svelte';

	export let data: { result: Quizzes };

	const quizzes: Quizzes = data.result;
	console.log(quizzes[0].options);

	let realtime = 20;
	let original = 100;
	let intervalValue = original / realtime;
	let timer = tweened(original);

	setInterval(() => {
		if ($timer > 0) $timer -= intervalValue;
	}, 100);

	let buttonRounded: string =
		'bg-buttonAnswer rounded-full text-white w-8 h-8 md:w-12 md:h-12 text-2xl md:text-4xl';

	let questions: Question[] = [
		{
			question: 'Which of the following special symbol allowed in a variable name?',
			options: ['* (asterisk)', '| (pipeline)', '- (hyphen)', '_ (underscore)'],
			correctIndex: 3
		},
		{
			question:
				'Which of the following correctly shows the hierarchy of arithmetic operations in C?',
			options: ['/ + * -', '* - / +', '+ - / *', '/ * + -'],
			correctIndex: 3
		},
		{
			question:
				'Which header file should be included to use functions like malloc() and calloc()?',
			options: ['memory.h', 'stdlib.h', 'string.h', 'dos.h'],
			correctIndex: 1
		},
		{
			question:
				'Which bitwise operator is suitable for turning off a particular bit in a number?',
			options: ['&& operator', '& operator', '|| operator', '! operator'],
			correctIndex: 1
		},
		{
			question: 'What function should be used to free the memory allocated by calloc() ?',
			options: [
				'dealloc();',
				'malloc(variable_name, 0)',
				'free();',
				'memalloc(variable_name, 0)'
			],
			correctIndex: 2
		}
	];

	let questionPointer = 1;
	let options: string[];
	console.log(quizzes[questionPointer]);

	$: options = [
		{
			id: 'A',
			contents: quizzes[questionPointer].options,
			color: 'bg-optionA'
		},
		{
			id: 'B',
			contents: quizzes[questionPointer].options,
			color: 'bg-optionB'
		},
		{
			id: 'C',
			contents: quizzes[questionPointer].options,
			color: 'bg-optionC'
		},
		{
			id: 'D',
			contents: quizzes[questionPointer].options,
			color: 'bg-optionD'
		}
	];

	function nextQuestion() {
		questionPointer++;
		timer = tweened(original);
	}
</script>

<div class=" bg-greenLight flex flex-col justify-center w-full">
	<div class="px-4 md:px-16 py-6">
		<Progressbar progress={$timer.toString()} color="gray" />
	</div>
	<div class="flex justify-between px-4 py-4 md:px-16">
		<button class="px-4 bg-red-500 text-xl rounded-2xl">End Game</button>
		<button on:click={nextQuestion} class="px-4 bg-buttonHover text-xl rounded-2xl text-white"
			>Next Question</button
		>
	</div>
	<div class="question px-8 md:px-32">
		<div class="px-4 py-2 bg-secondary min-h-[208px] rounded-3xl">
			<h1 class="px-4 text-4xl text-white font-bold">Question</h1>
			<p class="p-2 text-2xl text-white">{questions[questionPointer].question}</p>
		</div>
	</div>
	<div class="answer px-4 md:px-16 py-8">
		<div class="grid grid-cols-2 grid-rows-2 gap-4 md:gap-8 min-h-[208px]">
			{#each options as opt}
				<button class={`${opt.color} rounded-2xl flex p-2 md:p-4 gap-2`}>
					<div class="rounded-full">
						<button class={buttonRounded}>
							{opt.id}
						</button>
					</div>
					<p class="text-sm md:text-xl font-semibold text-left">{opt.contents}</p>
				</button>
			{/each}
		</div>
	</div>
</div>
