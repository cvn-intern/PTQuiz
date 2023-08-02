<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Modal, Progressbar } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import QuestionDisplay from '$components/playGame/questionDisplay.svelte';
	import type { SocketQuiz } from '../../playGame/[quizzesId]/play/quizzes.interface';
	import { TypeQuestion } from '$libs/constants/typeQuestion';
	import { tweened } from 'svelte/motion';
	import SingleChoiceSocket from '$components/playGame/socket/singleChoiceSocket.svelte';
	import WaitingRoom from '$components/playGame/socket/waitingRoom.svelte';
	import Loading from '$components/loading.svelte';
	import type { LayoutData } from '../../../../$types';
	import { EmitChannel, ListenChannel } from '$constants/socketChannel';
	import MultiChoiceSocket from '$components/playGame/socket/multiChoiceSocket.svelte';
	import { createSocket } from '../../../../../libs/socket/socket';
	export let data: LayoutData;
	type Participant = {
		id: string;
		displayName: string;
		avatar: string;
		isHost: boolean;
		point: number;
		correct: number;
	};
	type Message = {
		participant: Participant;
		content: string;
		reaction: string | null;
		id: number;
		left: number;
		style: string;
	};
	const socket = createSocket(data.url, data.token);
	let isEndGame: boolean = false;
	let questionPointer: number = 0;
	let isLoading: boolean = true;
	let showModal: boolean = false;
	let showScoreBoard: boolean = false;
	let errorMessage: string = '';
	let participants: Participant[] = [];
	let messages: Message[] = [];
	let messageContent: string = '';
	let questions: SocketQuiz[] = [];
	let selectedReaction: string | null = '';
	let url = $page.url.href;
	let isHost: boolean = false;
	let isPicked = false;

	let original = 10;
	let stringTimer: string;
	let timer = tweened(original);

	setInterval(() => {
		if ($timer > 0) {
			$timer--;
		}
	}, 1000);

	$: {
		stringTimer = (($timer * 100) / original).toString();
	}
	onMount(() => {
		setTimeout(() => {
			socket.emit(ListenChannel.JOIN_ROOM, {
				roomPIN: $page.params.slug
			});
			socket.emit(ListenChannel.IS_HOST, {
				roomPIN: $page.params.slug
			});
		}, 1000);
		socket.on(EmitChannel.ROOM_USERS, (data: any) => {
			isLoading = false;
			participants = data;
		});
		socket.on(EmitChannel.EXCEPTION, (data: any) => {
			isLoading = false;
			errorMessage = data.message;
		});
		socket.on(EmitChannel.ROOM_MESSAGES, (data: any) => {
			const newMessage = {
				participant: {
					id: data.userId,
					displayName: data.userId,
					avatar: data.avatar,
					isHost: data.isHost,
					point: data.point,
					correct: data.correct
				},
				content: data.message,
				reaction: data.reaction,
				id: Date.now(),
				left: Math.random() * 80,
				style: `position: absolute; left: ${
					Math.random() * 80
				}vw; animation: flyAndFade 5s linear forwards;`
			};
			messages = [...messages, newMessage];
		});
		socket.on(EmitChannel.IS_HOST, (data: any) => {
			isHost = data.isHost;
		});
		socket.on(EmitChannel.QUIZ_QUESTIONS, (data: any) => {
			questions = data;
			isPicked = false;
			original = questions[questionPointer].time;
			timer = tweened(original);
		});
		socket.on(EmitChannel.QUESTION_POINTER, (data: any) => {
			questionPointer = data.questionPointer;
			isPicked = false;
			original = questions[questionPointer].time;
			timer = tweened(original);
		});
		socket.on(EmitChannel.SCORE_BOARD, (data: any) => {
			participants = data;
		});
		socket.on(EmitChannel.ENDED, (data: any) => {
			isEndGame = data.isEnded;
		});
	});
	onDestroy(() => {
		socket.emit(ListenChannel.LEAVE_ROOM, {
			roomPIN: $page.params.slug
		});
		socket.disconnect();
	});
	function startGame() {
		isEndGame = false;
		socket.emit(ListenChannel.START_GAME, {
			roomPIN: $page.params.slug
		});
		socket.emit(ListenChannel.GET_QUIZ_QUESTIONS, {
			roomPIN: $page.params.slug
		});
	}
	const nextQuestion = () => {
		socket.emit(ListenChannel.CHANGE_QUESTION_POINTER, {
			questionPointer: questionPointer + 1,
			roomPIN: $page.params.slug
		});
	};

	let isButtonDisabled = false;

	async function sendMessage() {
		if (isButtonDisabled) return;
		socket.emit(ListenChannel.SEND_MESSAGE, {
			roomPIN: $page.params.slug,
			userId: data.user.id,
			avatar: data.user.avatar,
			message: messageContent,
			reaction: selectedReaction
		});
		messageContent = '';
		selectedReaction = '';
		isButtonDisabled = true;
		setTimeout(() => {
			isButtonDisabled = false;
		}, 500);
	}
	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		toast.success('Copied to clipboard');
	};
	const getScoreBoard = () => {
		showScoreBoard = true;
		setTimeout(() => {
			showScoreBoard = false;
		}, 5000);
	};
	const endGame = () => {
		socket.emit(ListenChannel.END_GAME, {
			roomPIN: $page.params.slug
		});
	};
</script>

{#if isLoading}
	<div class="bg-greenLight w-full h-screen">
		<Loading />
	</div>
{:else}
	<div class="bg-greenLight w-full h-screen px-4 lg:px-16">
		{#if errorMessage}
			<h1 class="w-full h-full flex justify-center items-center">{errorMessage}</h1>
		{:else if isEndGame}
			<div class="flex flex-col justify-center items-center">
				{#each participants as participant, index}
					<div class="flex gap-4 items-center">
						<p>No {index + 1}</p>
						<p class="truncate w-32">{participant.displayName}</p>
						<img
							src={participant.avatar}
							alt={participant.displayName}
							class="w-10 h-10 rounded-full ml-4"
						/>
						<p>{participant.point}</p>
					</div>
				{/each}
			</div>
		{:else if questions.length > 0}
			<div>
				<div class="flex flex-col h-screen w-full font-sans p-2 gap-4">
					<div class="pt-4">
						<Progressbar progress={stringTimer} size="h-4" color="gray" />
					</div>
					{#if isHost}
						<div class="flex gap-4">
							{#if questionPointer < questions.length - 1}
								<button
									class="h-fit w-fit bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
									on:click={nextQuestion}>Next</button
								>
							{:else}
								<button
									class="h-fit w-fit bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
									on:click={endGame}>End game</button
								>
							{/if}
							<button
								class="h-fit w-fit bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
								on:click={getScoreBoard}>Score board</button
							>
						</div>
					{/if}
					<div class="h-full p-2 gap-2">
						<div class="question h-1/2">
							<QuestionDisplay
								quizzesType={questions[questionPointer].type}
								quizzesTitle={questions[questionPointer].title}
								quizzesNumber={questions.length}
								quizzesPointer={questionPointer}
								quizzesImage={questions[questionPointer].image}
							/>
						</div>
						<div class="answer h-1/2">
							{#if questions[questionPointer].type === TypeQuestion.SINGLE_CHOICE}
								<div
									class="grid grid-cols-1 gird-rows-4 md:grid-cols-2 md:grid-rows-2 w-full gap-4 h-full"
								>
									<SingleChoiceSocket
										bind:timer
										question={questions[questionPointer]}
										bind:isPicked
										{showModal}
										{socket}
										isTrueFalse={false}
									/>
								</div>
							{:else if questions[questionPointer].type === TypeQuestion.TRUE_FALSE}
								<div
									class="grid grid-cols-1 gird-rows-2 md:grid-cols-2 md:grid-rows-1 w-full gap-4 h-full"
								>
									<SingleChoiceSocket
										bind:timer
										question={questions[questionPointer]}
										bind:isPicked
										{showModal}
										{socket}
										isTrueFalse={true}
									/>
								</div>
							{:else if questions[questionPointer].type === TypeQuestion.MULTIPLE_CHOICE}
								<div
									class="grid grid-cols-1 gird-rows-4 md:grid-cols-2 md:grid-rows-2 w-full gap-4 h-full"
								>
									<MultiChoiceSocket
										bind:timer
										question={questions[questionPointer]}
										bind:isPicked
										{showModal}
										{socket}
									/>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{:else}
			<WaitingRoom
				{startGame}
				{url}
				{participants}
				bind:messages
				{sendMessage}
				bind:messageContent
				bind:selectedReaction
				{isHost}
				bind:isButtonDisabled
			/>
		{/if}
	</div>
{/if}

{#if showScoreBoard}
	<Modal bind:open={showScoreBoard} autoclose placement="top-center">
		<div class="flex flex-col justify-center items-center">
			{#each participants as participant, index}
				<div class="flex gap-4 items-center">
					<p>No {index + 1}</p>
					<p class="truncate w-32">{participant.displayName}</p>
					<img
						src={participant.avatar}
						alt={participant.displayName}
						class="w-10 h-10 rounded-full ml-4"
					/>
					<p>{participant.correct}</p>
					<p>{participant.point}</p>
				</div>
			{/each}
		</div>
	</Modal>
{/if}
