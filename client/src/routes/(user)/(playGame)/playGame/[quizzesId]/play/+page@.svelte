<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { QuizzesType, UserAnswer } from './quizzes.interface.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Progressbar } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import CryptoJS from 'crypto-js';
	import SingleChoiceAnswer from '$components/playGame/singleChoiceAnswer.svelte';
	import { gameInfoStore } from '$stores/gameInfoStore.js';
	import { t } from '$i18n/translations.js';
	import { TypeQuestion } from '$constants/typeQuestion.js';
	import MultipleChoiceAnswer from '$components/playGame/multipleChoiceAnswer.svelte';
	import TextAnswer from '$components/playGame/textAnswer.svelte';
	export let data;

	let questionPointer = 0;
	let fourOptions: any[];
	let isAnswerChecked: boolean = false;
	let isMultipleChecked: boolean = false;
	let isGuessWordsChecked: boolean = false;
	let multipleChoiceAnswer: boolean[] = [false, false, false, false];
	let selectedAnswerIndex: number;
	let sharedToastId: string | number;
	let isSubmitting = false;
	let showModal = false;
	let stringTimer: string;
	let finalAnswer: string;
	let isTrueFalse: boolean = false;

	const key = import.meta.env.VITE_CRYPTO_KEY;

	function decryptData(cipherText: any) {
		const bytes = CryptoJS.AES.decrypt(cipherText, key);
		const originalText = bytes.toString(CryptoJS.enc.Utf8);
		return JSON.parse(originalText);
	}

	let quizzes: QuizzesType = data.result;
	quizzes = decryptData(quizzes);
	let quizzesId = $page.params.quizzesId;

	let gameInfo: any;
	gameInfoStore.subscribe((val) => (gameInfo = val));

	if (!gameInfo) window.location.href = `/playGame/${quizzesId}`;

	let original = quizzes[questionPointer].time;
	let zero = 0;

	let timer = tweened(original);

	setInterval(() => {
		if ($timer > 0) {
			$timer--;
		}
	}, 1000);

	$: stringTimer = (($timer * 100) / original).toString();

	const givenAn: {
		[key: string]: { answerA: boolean; answerB: boolean; answerC: boolean; answerD: boolean };
	} = {};

	let answerOfUser: {
		[key: string]: { questionId: string; givenAnswers: any; writtenAnswer: string };
	} = {};

	function pickGuessWords(finalAnswer: string) {
		isAnswerChecked = true;
		givenAn[questionPointer] = {
			answerA: false,
			answerB: false,
			answerC: false,
			answerD: false
		};
		answerOfUser[questionPointer] = {
			questionId: quizzes[questionPointer].id,
			givenAnswers: givenAn[questionPointer],
			writtenAnswer: finalAnswer
		};
	}

	function pickAnswer(index: number) {
		isAnswerChecked = true;
		selectedAnswerIndex = index;

		const question = quizzes[questionPointer];
		const answerKey = Object.keys(question.answers).find(
			(key) => question.answers[key] === true
		);

		if (answerKey) {
			givenAn[questionPointer] = {
				answerA: selectedAnswerIndex === 0 ? true : false,
				answerB: selectedAnswerIndex === 1 ? true : false,
				answerC: selectedAnswerIndex === 2 ? true : false,
				answerD: selectedAnswerIndex === 3 ? true : false
			};
			answerOfUser[questionPointer] = {
				questionId: quizzes[questionPointer].id,
				givenAnswers: givenAn[questionPointer],
				writtenAnswer: ''
			};
		}
	}

	function pickMultipleAnswer(multipleChoiceAnswer: boolean[]) {
		const question = quizzes[questionPointer];
		const answerKey = Object.keys(question.answers).find(
			(key) => question.answers[key] === true
		);
		if (answerKey) {
			givenAn[questionPointer] = {
				answerA: multipleChoiceAnswer[0],
				answerB: multipleChoiceAnswer[1],
				answerC: multipleChoiceAnswer[2],
				answerD: multipleChoiceAnswer[3]
			};
			answerOfUser[questionPointer] = {
				questionId: quizzes[questionPointer].id,
				givenAnswers: givenAn[questionPointer],
				writtenAnswer: ''
			};
			isMultipleChecked = false;
			isAnswerChecked = true;
		}
	}

	const showLoadingToast = (): void => {
		sharedToastId = toast.loading(t.get('common.loading'), { duration: 20000 });
	};

	const dismissLoadingToast = (): void => {
		toast.dismiss(sharedToastId.toString());
	};

	async function submitQuiz() {
		if (isSubmitting) return;

		try {
			isAnswerChecked = true;
			timer = tweened(zero);
			isSubmitting = true;

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
				toast.success(t.get('common.success'));
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
			if (isMultipleChecked) {
				pickMultipleAnswer(multipleChoiceAnswer);
				isMultipleChecked = false;
				showModal = true;
				setTimeout(() => {
					showModal = false;
				}, 2000);
			} else if (isGuessWordsChecked) {
				pickGuessWords(finalAnswer);
				isGuessWordsChecked = false;
				showModal = true;
				setTimeout(() => {
					showModal = false;
				}, 2000);
			} else {
				isAnswerChecked = true;
				pickAnswer(-1);
				selectedAnswerIndex = -1;
				showModal = true;
				setTimeout(() => {
					showModal = false;
				}, 2000);
			}
		}
	}

	$: {
		if (isAnswerChecked === true) {
			timer = tweened(zero);
			if (questionPointer < quizzes.length - 1) {
				setTimeout(() => {
					questionPointer++;
					timer = tweened(original);
					isAnswerChecked = false;
				}, 2000);
			} else {
				setTimeout(() => {
					submitQuiz();
				}, 2000);
			}
		}
	}

	const question = quizzes[questionPointer];

	$: {
		fourOptions = Object.keys(question.options).map((optionKey, index) => ({
			id: optionKey,
			contents: quizzes[questionPointer].options[optionKey],
			isCorrect: quizzes[questionPointer].answers[Object.keys(question.answers)[index]],
			disabled: isAnswerChecked ? true : false
		}));
	}

	$: {
		if (quizzes[questionPointer].type === TypeQuestion.TRUE_FALSE) {
			isTrueFalse = true;
		} else {
			isTrueFalse = false;
		}
	}
</script>

<div class=" bg-greenLight flex flex-col h-screen w-full font-sans p-2 gap-4">
	<div class="pt-4">
		<Progressbar progress={stringTimer} size="h-4" color="gray" />
	</div>
	<div class=" h-full p-2 rounded-lg">
		<div class="question h-1/2 relative">
			<div class="absolute right-0">
				{#if quizzes[questionPointer].type === TypeQuestion.SINGLE_CHOICE}
					<div
						class="grid grid-cols-2 grid-rows-2 gap-2 bg-white p-2 rounded-xl items-center"
					>
						<div class="w-12 h-10 rounded-lg bg-green-500" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
					</div>
				{:else if quizzes[questionPointer].type === TypeQuestion.MULTIPLE_CHOICE}
					<div
						class="grid grid-cols-2 grid-rows-2 gap-2 bg-white p-2 rounded-xl items-center"
					>
						<div class="w-12 h-10 rounded-lg bg-green-500" />
						<div class="w-12 h-10 rounded-lg bg-green-500" />
						<div class="w-12 h-10 rounded-lg bg-green-500" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
					</div>
				{:else if quizzes[questionPointer].type === TypeQuestion.TRUE_FALSE}
					<div
						class="grid grid-cols-2 grid-rows-1 gap-2 bg-white p-2 rounded-xl items-center"
					>
						<div class="w-12 h-10 rounded-lg bg-green-500" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
					</div>
				{:else if quizzes[questionPointer].type === TypeQuestion.GUESS_WORDS}
					<div class="flex p-4 gap-2 bg-white rounded-xl items-center">
						<div
							class=" w-10 h-12 flex justify-center items-center rounded-lg border shadow-lg bg-secondary text-2xl"
						>
							A
						</div>
						<div
							class=" w-10 h-12 flex justify-center items-center rounded-lg border shadow-lg bg-secondary text-2xl"
						>
							B
						</div>
						<div
							class=" w-10 h-12 flex justify-center items-center rounded-lg border shadow-lg bg-secondary text-2xl"
						>
							C
						</div>
					</div>
				{/if}
			</div>
			<div class="flex justify-center items-center h-full px-4">
				<p
					class="p-2 text-3xl md:text-5xl lg:text-7xl font-semibold text-black text-center"
				>
					{quizzes[questionPointer].title}
				</p>
			</div>
		</div>
		<div class="answer h-1/2">
			{#if quizzes[questionPointer].type === TypeQuestion.SINGLE_CHOICE}
				<div
					class="grid grid-cols-1 gird-rows-4 md:grid-cols-2 md:grid-rows-2 w-full gap-4 h-full"
				>
					{#each fourOptions as opt, index}
						<SingleChoiceAnswer
							option={opt}
							{index}
							{isAnswerChecked}
							{selectedAnswerIndex}
							{pickAnswer}
							{showModal}
							{isTrueFalse}
						/>
					{/each}
				</div>
			{:else if quizzes[questionPointer].type === TypeQuestion.MULTIPLE_CHOICE}
				<div class="h-full">
					<MultipleChoiceAnswer
						bind:multipleChoiceAnswer
						bind:isMultipleChecked
						bind:isAnswerChecked
						{fourOptions}
						{showModal}
					/>
				</div>
			{:else if quizzes[questionPointer].type === TypeQuestion.TRUE_FALSE}
				<div
					class="grid grid-cols-1 gird-rows-2 md:grid-cols-2 md:grid-rows-1 w-full gap-4 h-full"
				>
					{#each fourOptions as opt, index}
						{#if opt.contents !== null}
							<SingleChoiceAnswer
								option={opt}
								{index}
								{isAnswerChecked}
								{selectedAnswerIndex}
								{pickAnswer}
								{showModal}
								{isTrueFalse}
							/>
						{/if}
					{/each}
				</div>
			{:else if quizzes[questionPointer].type === TypeQuestion.GUESS_WORDS}
				<TextAnswer
					bind:isAnswerChecked
					bind:answer={quizzes[questionPointer].written}
					bind:finalAnswer
					bind:isGuessWordsChecked
					{showModal}
				/>
			{/if}
		</div>
	</div>
</div>
