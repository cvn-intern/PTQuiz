<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { QuizzesType, UserAnswer } from './quizzes.interface.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Progressbar } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import CryptoJS from 'crypto-js';
	import FourAnswer from '$components/playGame/fourAnswer.svelte';
	import { gameInfoStore } from '$stores/gameInfoStore.js';
	export let data;

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

	let original = 100;
	let zero = 0;
	let timer_default = 5;

	let intervalValue = original / timer_default;
	let timer = tweened(original);

	setInterval(() => {
		if ($timer > 0) $timer -= intervalValue;
	}, 100);

	let questionPointer = 0;
	let fourOptions: any[];
	let isAnswerChecked: boolean = false;
	let selectedAnswerIndex: number;
	let sharedToastId: string | number;
	let isSubmitting = false;
	let showModal = false;

	const givenAn: {
		[key: string]: { answerA: boolean; answerB: boolean; answerC: boolean; answerD: boolean };
	} = {};

	const answerOfUser: {
		[key: string]: { questionId: string; givenAnswers: any };
	} = {};

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
				givenAnswers: givenAn[questionPointer]
			};
		}
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
			timer = tweened(zero);
			isSubmitting = true;

			const userAnswer: UserAnswer = {
				participantId: gameInfo.id,
				answerOfUser: answerOfUser
			};

			console.log(userAnswer);

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
			pickAnswer(-1);
			selectedAnswerIndex = -1;
			showModal = true;
			setTimeout(() => {
				showModal = false;
			}, 3000);
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
				}, 3000);
			} else {
				setTimeout(() => {
					submitQuiz();
				}, 3000);
			}
		}
	}

	const question = quizzes[questionPointer];

	$: fourOptions = Object.keys(question.options).map((optionKey, index) => ({
		id: optionKey,
		contents: quizzes[questionPointer].options[optionKey],
		isCorrect: quizzes[questionPointer].answers[Object.keys(question.answers)[index]],
		disabled: isAnswerChecked ? true : false
	}));

	$: console.log(fourOptions);
</script>

<div class=" bg-greenLight flex flex-col h-screen w-full font-sans p-2">
	<div class="pt-4">
		<Progressbar progress={$timer.toString()} color="gray" size="h-4" />
	</div>

	<div class=" h-full p-2 rounded-lg">
		<div class="question h-1/2">
			<div class="flex justify-center items-center h-full px-4">
				<p class="p-2 text-3xl md:text-5xl lg:text-7xl text-black text-center">
					{quizzes[questionPointer].title}
				</p>
			</div>
		</div>
		<div class="answer h-1/2">
			<div
				class="grid grid-cols-1 gird-rows-4 md:grid-cols-2 md:grid-rows-2 w-full gap-4 h-full"
			>
				{#each fourOptions as opt, index}
					<FourAnswer
						option={opt}
						{index}
						{isAnswerChecked}
						{selectedAnswerIndex}
						{pickAnswer}
						{showModal}
					/>
				{/each}
			</div>
		</div>
	</div>
</div>
