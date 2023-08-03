<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { QuizzesType, UserAnswer } from './quizzes.interface.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import CryptoJS from 'crypto-js';
	import SingleChoiceAnswer from '$components/playGame/singlePlay/singleChoiceAnswer.svelte';
	import { gameInfoStore } from '$stores/gameInfoStore.js';
	import { t } from '$i18n/translations.js';
	import { TypeQuestion } from '$constants/typeQuestion.js';
	import MultipleChoiceAnswer from '$components/playGame/singlePlay/multipleChoiceAnswer.svelte';
	import QuestionDisplay from '$components/playGame/singlePlay/questionDisplay.svelte';
	import InputText from '$components/playGame/singlePlay/inputText.svelte';
	import ArrangeAnswer from '$components/playGame/singlePlay/arrangeAnswer.svelte';
	import CrossWords from '$components/playGame/singlePlay/crossWords.svelte';
	import ProgressBar from '$components/playGame/socket/progressBar.svelte';
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
	let isShowOption: boolean = true;
	let isGif: boolean = false;

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

	if (!gameInfo) {
		window.location.href = `/playGame/${quizzesId}`;
	}

	let original = quizzes[0].time;
	let timer = tweened(original, {
		duration: 1000
	});

	if (quizzes[questionPointer].type === TypeQuestion.GIF_SINGLE_CHOICE) {
		isGif = true;
		isShowOption = false;
	}

	setInterval(() => {
		if ($timer > 0 && isShowOption) {
			$timer--;
		}
	}, 1000);

	$: stringTimer = (($timer * 100) / original).toString();

	function zeroTimer() {
		timer = tweened(0);
	}

	function fullTimer() {
		original = quizzes[questionPointer].time;
		timer = tweened(original, {
			duration: 1000
		});
	}

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
			zeroTimer();
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

	function changeIsShowOption() {
		if (quizzes[questionPointer].type === TypeQuestion.GIF_SINGLE_CHOICE) {
			isShowOption = false;
		}
	}

	$: if (isAnswerChecked === true) {
		zeroTimer();
		if (questionPointer < quizzes.length - 1) {
			setTimeout(() => {
				questionPointer++;
				fullTimer();

				changeIsShowOption();
				isAnswerChecked = false;
			}, 2000);
		} else {
			setTimeout(() => {
				submitQuiz();
			}, 2000);
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

		if (quizzes[questionPointer].type === TypeQuestion.GIF_SINGLE_CHOICE) {
			isGif = true;
		} else {
			isGif = false;
		}
	}
</script>

<div class="bg-greenLight flex flex-col h-screen w-full font-sans p-2 gap-4">
	<div class="pt-2">
		<ProgressBar {stringTimer} />
	</div>
	<div class="h-full p-2 flex flex-col gap-4">
		<div class="question h-2/3">
			<QuestionDisplay
				quizzesType={quizzes[questionPointer].type}
				quizzesTitle={quizzes[questionPointer].title}
				quizzesNumber={quizzes.length}
				quizzesPointer={questionPointer}
				quizzesImage={quizzes[questionPointer].image}
				bind:isShowOption
			/>
		</div>
		<div class="answer h-1/3">
			{#if quizzes[questionPointer].type === TypeQuestion.GIF_SINGLE_CHOICE}
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
							bind:isGif
							bind:isShowOption
						/>
					{/each}
				</div>
			{:else if quizzes[questionPointer].type === TypeQuestion.SINGLE_CHOICE}
				<div class="grid grid-cols-2 grid-rows-2 w-full gap-2 md:gap-4 h-full">
					{#each fourOptions as opt, index}
						<SingleChoiceAnswer
							option={opt}
							{index}
							{isAnswerChecked}
							{selectedAnswerIndex}
							{pickAnswer}
							{showModal}
							{isTrueFalse}
							bind:isGif
							bind:isShowOption
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
					{#each fourOptions.slice(0, 2) as opt, index}
						{#if opt.contents !== null}
							<SingleChoiceAnswer
								option={opt}
								{index}
								{isAnswerChecked}
								{selectedAnswerIndex}
								{pickAnswer}
								{showModal}
								{isTrueFalse}
								bind:isGif
								bind:isShowOption
							/>
						{/if}
					{/each}
				</div>
			{:else if quizzes[questionPointer].type === TypeQuestion.GUESS_WORDS}
				<CrossWords
					bind:isAnswerChecked
					bind:answer={quizzes[questionPointer].written}
					bind:finalAnswer
					bind:isGuessWordsChecked
					{showModal}
				/>
			{:else if quizzes[questionPointer].type === TypeQuestion.INPUT_TEXT}
				<InputText
					bind:isAnswerChecked
					bind:answer={quizzes[questionPointer].written}
					bind:finalAnswer
					bind:isGuessWordsChecked
					{showModal}
					{pickGuessWords}
				/>
			{:else if quizzes[questionPointer].type === TypeQuestion.ARRANGE_WORD}
				<ArrangeAnswer
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
