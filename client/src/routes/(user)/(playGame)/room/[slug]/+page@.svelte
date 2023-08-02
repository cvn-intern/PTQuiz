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
	import CrossWordsSocket from '../../../../../components/playGame/socket/crossWordsSocket.svelte';
	import ArrangeAnswerSocket from '$components/playGame/socket/arrangeAnswerSocket.svelte';
	import InputTextSocket from '$components/playGame/socket/inputTextSocket.svelte';
	import HostButton from '$components/playGame/socket/hostButton.svelte';
	import ScoreboardModal from '$components/playGame/scoreboardModal.svelte';
	export let data: LayoutData;
	type Participant = {
		id: string;
		displayName: string;
		avatar: string;
		isHost: boolean;
		point: number;
		correct: number;
		isAnswered: boolean;
	};
	const socket = createSocket(data.url, data.token);
	let isEndGame: boolean = false;
	let numberOfAnswer: number = 0;
	let questionPointer: number = 0;
	let isLoading: boolean = true;
	let showModal: boolean = false;
	let showScoreBoard: boolean = false;
	let errorMessage: string = '';
	let participants: Participant[] = [];
	let questions: SocketQuiz[] = [];
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
	$: {
		numberOfAnswer = participants.filter((participant: any) => {
			return participant.isAnswered;
		}).length;
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
			// participants = data;
			// Keep every participant's isAnswered state
			if (data.signal === 'join') {
				participants = data.roomParticipants.map((participant: any) => {
					return {
						...participant,
						isAnswered: false
					};
				});
			} else {
				const newParticipantsId = data.roomParticipants.map((participant: any) => {
					return participant.id;
				});
				const participantsId = participants.map((participant: any) => {
					return participant.id;
				});
				const intersection = participantsId.filter((element: any) =>
					newParticipantsId.includes(element)
				);
				participants = participants.filter((participant: any) => {
					return intersection.includes(participant.id);
				});
			}
		});
		socket.on(EmitChannel.EXCEPTION, (data: any) => {
			isLoading = false;
			errorMessage = data.message;
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
			participants = participants.map((participant: any) => {
				return {
					...participant,
					isAnswered: false
				};
			});
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
                    <div>
                        {numberOfAnswer}/{participants.length} answered
                    </div>
					<div class="pt-4">
						<Progressbar progress={stringTimer} size="h-4" color="gray" />
					</div>
					{#if isHost}
						<HostButton
							{nextQuestion}
							{questionPointer}
							{questions}
							{endGame}
							{getScoreBoard}
						/>
					{/if}
					<div class="h-full p-2 gap-2">
						<div class="question h-2/3">
							<QuestionDisplay
								quizzesType={questions[questionPointer].type}
								quizzesTitle={questions[questionPointer].title}
								quizzesNumber={questions.length}
								quizzesPointer={questionPointer}
								quizzesImage={questions[questionPointer].image}
							/>
						</div>
						<div class="answer h-1/3">
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
							{:else if questions[questionPointer].type === TypeQuestion.GUESS_WORDS}
								<CrossWordsSocket
									bind:timer
									question={questions[questionPointer]}
									bind:isPicked
									{showModal}
									{socket}
								/>
							{:else if questions[questionPointer].type === TypeQuestion.ARRANGE_WORD}
								<ArrangeAnswerSocket
									bind:timer
									question={questions[questionPointer]}
									bind:isPicked
									{showModal}
									{socket}
								/>
							{:else if questions[questionPointer].type === TypeQuestion.INPUT_TEXT}
								<InputTextSocket
									bind:timer
									question={questions[questionPointer]}
									bind:isPicked
									{showModal}
									{socket}
								/>
							{/if}
						</div>
					</div>
				</div>
			</div>
		{:else}
			<WaitingRoom {startGame} {url} {participants} {isHost} {socket} />
		{/if}
	</div>
{/if}

{#if showScoreBoard}
	<ScoreboardModal {participants} {showScoreBoard} />
{/if}
