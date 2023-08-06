<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { TypeQuestion } from '$libs/constants/typeQuestion';
	import { tweened } from 'svelte/motion';
	import SingleChoiceSocket from '$components/playGame/socket/singleChoiceSocket.svelte';
	import SingleChoiceGifSocket from '$components/playGame/socket/singleChoiceGifSocket.svelte';
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
	import ScoreboardModal from '$components/playGame/socket/scoreboardModal.svelte';
	import ProgressBar from '$components/playGame/progressBar.svelte';
	import EndGameSocket from '$components/playGame/socket/endGameSocket.svelte';
	import type { SocketQuiz } from '../../play-game/[quizzesId]/play/quizzes.interface';
	import QuestionDisplaySocket from '$components/playGame/socket/questionDisplaySocket.svelte';
	import ErrorDisplay from '$components/playGame/socket/errorDisplay.svelte';
	import AliasName from '../../../../../components/playGame/socket/aliasName.svelte';
	import { RoomType } from '$components/quizzes/room.enum';
	import ScoreBarBattle from '$components/playGame/socket/battle/scoreBarBattle.svelte';
	import { translateValidation } from '../../../../../libs/helpers/translateValidation';
	import { t } from '../../../../../libs/i18n/translations';
	import NotificationModal from '$components/playGame/socket/notificationModal.svelte';
	import doorBell from '$assets/doorbell.mp3';

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
	let isShowOption: boolean = false;
	let isJoined: boolean = false;
	let roomInfo: any;
	let beKicked: boolean = false;
	let isBattle: boolean;
	let isHostLeft: boolean = false;
	let audio: any;

	let original = 10;
	let stringTimer: string;
	let timer = tweened(original, {
		duration: 1000
	});

	let countDown = setInterval(() => {
		if ($timer >= 1 && isShowOption) {
			$timer = Math.floor($timer) - 1;
		}
	}, 1000);

	$: {
		stringTimer = (($timer * 100) / original).toString();
	}
	onMount(() => {
		socket.emit(ListenChannel.CHECK_IS_HOST, {
			roomPIN: $page.params.slug
		});
		setTimeout(() => {
			socket.emit(ListenChannel.GET_ROOM_INFO, {
				roomPIN: $page.params.slug
			});
		}, 1000);
		socket.on(EmitChannel.ROOM_INFO, (data: any) => {
			roomInfo = data;
			if (roomInfo.room.isStarted) {
				errorMessage = t.get('common.gameAlreadyStarted');
			} else if (roomInfo.room.isClosed) {
				errorMessage = t.get('common.roomClosed');
			}
			isLoading = false;
			isBattle = roomInfo.room.type === RoomType.BATTLE ? true : false;
		});
		socket.on(EmitChannel.ROOM_USERS, (data: any) => {
			isLoading = false;
			if (data.signal === 'join') {
				audio.play();
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
			errorMessage = translateValidation(data.message);
		});
		socket.on(EmitChannel.IS_HOST, (data: any) => {
			isHost = data.isHost;
		});
		socket.on(EmitChannel.QUESTIONS, (data: any) => {
			questions = data;
			isPicked = false;
			original = questions[questionPointer].time;
			if (isHost && !isBattle) {
				original += 4;
				timer = tweened(original, {
					duration: 1000
				});
			} else {
				timer = tweened(original, {
					duration: 1000
				});
			}
			countDown = setInterval(() => {
				if ($timer >= 1 && isShowOption) {
					$timer = Math.floor($timer) - 1;
				}
			}, 1000);

			if (questions[questionPointer].type === TypeQuestion.GIF_SINGLE_CHOICE) {
				isShowOption = false;
			} else {
				isShowOption = true;
			}
		});
		socket.on(EmitChannel.NEXT_QUESTION, (data: any) => {
			questionPointer = data.questionPointer;
			isPicked = false;
			participants = participants.map((participant: any) => {
				return {
					...participant,
					isAnswered: false
				};
			});
			original = questions[questionPointer].time;
			if (isHost && !isBattle) {
				original += 4;
				timer = tweened(original, {
					duration: 1000
				});
			} else {
				timer = tweened(original, {
					duration: 1000
				});
			}
			countDown = setInterval(() => {
				if ($timer >= 1 && isShowOption) {
					$timer = Math.floor($timer) - 1;
				}
			}, 1000);
			if (questions[questionPointer].type === TypeQuestion.GIF_SINGLE_CHOICE) {
				isShowOption = false;
			} else {
				isShowOption = true;
			}
		});
		socket.on(EmitChannel.SCORE_BOARD, (data: any) => {
			participants = data;
		});
		socket.on(EmitChannel.ENDED, (data: any) => {
			isEndGame = data.isEnded;
			if (!isHost) {
				participants = data.participants;
			}
		});
		socket.on(EmitChannel.HOST_LEFT, (data: any) => {
			if (!isHost) {
				isHostLeft = true;
				socket.emit(ListenChannel.LEAVE_ROOM, {
					roomPIN: $page.params.slug
				});
				socket.disconnect();
			}
		});
		socket.on(EmitChannel.BE_KICKED, (data: any) => {
			beKicked = data.beKicked;
			socket.emit(ListenChannel.LEAVE_ROOM, {
				roomPIN: $page.params.slug
			});
			socket.disconnect();
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
		socket.emit(ListenChannel.START_QUIZ, {
			roomPIN: $page.params.slug
		});
		socket.emit(ListenChannel.GET_QUESTIONS_BY_QUIZ, {
			roomPIN: $page.params.slug
		});
	}
	const nextQuestion = () => {
		socket.emit(ListenChannel.GET_NEXT_QUESTION, {
			questionPointer: questionPointer + 1,
			roomPIN: $page.params.slug
		});
	};

	const getScoreBoard = () => {
		showScoreBoard = true;
	};
	const endGame = () => {
		socket.emit(ListenChannel.END_QUIZ, {
			roomPIN: $page.params.slug,
			participants
		});
	};

	function handleBeKickedClick() {
		window.location.href = '/';
	}

	function handleHostLeftClick() {
		window.location.href = $page.url.href;
	}

	$: {
		if ($timer <= 0 && isBattle && isHost) {
			if (questionPointer < questions.length - 1) {
				setTimeout(() => {
					nextQuestion();
				}, 5000);
			} else {
				setTimeout(() => {
					endGame();
				}, 5000);
			}
		}
	}
</script>

{#if isLoading}
	<div class="bg-greenLight w-full h-screen">
		<Loading />
	</div>
{:else}
	<div class="bg-greenLight w-full h-screen">
		{#if errorMessage}
			<ErrorDisplay {errorMessage} />
		{:else if !isJoined}
			<AliasName {socket} bind:isJoined {roomInfo} />
		{:else if isEndGame}
			<EndGameSocket {participants} length={questions.length} {isEndGame} {isBattle} />
		{:else if questions.length > 0}
			<div class="question h-2/3 pb-4 flex flex-col p-2">
				{#if isBattle}
					<ScoreBarBattle bind:timer {participants} questionLength={questions.length} />
				{:else}
					<div class="py-2">
						<ProgressBar {stringTimer} />
					</div>
				{/if}
				{#if !isBattle && isHost}
					<HostButton
						{nextQuestion}
						{questionPointer}
						{questions}
						{endGame}
						{getScoreBoard}
						{participants}
						{isBattle}
						bind:timer
					/>
				{/if}
				<QuestionDisplaySocket
					quizzesType={questions[questionPointer].type}
					quizzesTitle={questions[questionPointer].title}
					quizzesNumber={questions.length}
					quizzesPointer={questionPointer}
					quizzesImage={questions[questionPointer].image}
					questionTime={questions[questionPointer].time}
					quizzesHint={questions[questionPointer].hint}
					{isHost}
					{socket}
					{isBattle}
					{participants}
					bind:timer
					bind:isShowOption
				/>
			</div>
			<div class="answer h-1/3 p-2">
				{#if questions[questionPointer].type === TypeQuestion.SINGLE_CHOICE}
					<div class="grid grid-cols-2 grid-rows-2 w-full gap-4 h-full">
						<SingleChoiceSocket
							bind:timer
							question={questions[questionPointer]}
							bind:isPicked
							{showModal}
							{socket}
							{isBattle}
							isTrueFalse={false}
							bind:countDown
							{isHost}
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
							{isBattle}
							bind:countDown
							{isHost}
						/>
					</div>
				{:else if questions[questionPointer].type === TypeQuestion.GIF_SINGLE_CHOICE}
					<div class="grid grid-cols-2 grid-rows-2 w-full gap-4 h-full">
						<SingleChoiceGifSocket
							bind:timer
							question={questions[questionPointer]}
							bind:isPicked
							{showModal}
							{socket}
							{isShowOption}
							bind:countDown
							{isHost}
							{isBattle}
						/>
					</div>
				{:else if questions[questionPointer].type === TypeQuestion.MULTIPLE_CHOICE}
					<div class="grid grid-cols-2 grid-rows-2 w-full gap-4 h-full">
						<MultiChoiceSocket
							bind:timer
							question={questions[questionPointer]}
							bind:isPicked
							{showModal}
							{socket}
							{isBattle}
							bind:countDown
							{isHost}
						/>
					</div>
				{:else if questions[questionPointer].type === TypeQuestion.GUESS_WORDS}
					<CrossWordsSocket
						bind:timer
						question={questions[questionPointer]}
						bind:isPicked
						{showModal}
						{socket}
						{isBattle}
						bind:countDown
						{isHost}
					/>
				{:else if questions[questionPointer].type === TypeQuestion.ARRANGE_WORD}
					<ArrangeAnswerSocket
						bind:timer
						question={questions[questionPointer]}
						bind:isPicked
						{showModal}
						{socket}
						{isBattle}
						bind:countDown
						{isHost}
					/>
				{:else if questions[questionPointer].type === TypeQuestion.INPUT_TEXT}
					<InputTextSocket
						bind:timer
						question={questions[questionPointer]}
						bind:isPicked
						{showModal}
						{socket}
						bind:countDown
						{isHost}
						{isBattle}
					/>
				{/if}
			</div>
		{:else}
			<WaitingRoom
				{startGame}
				{url}
				{participants}
				{isHost}
				{socket}
				user={data.user}
				room={roomInfo}
			/>
		{/if}
	</div>
{/if}

{#if showScoreBoard}
	<ScoreboardModal
		{participants}
		bind:showScoreBoard
		questionLength={questions.length}
		{isBattle}
		{isEndGame}
	/>
{/if}

<NotificationModal
	bind:open={beKicked}
	title={$t('common.beKicked')}
	buttonText={'OK'}
	onButtonClick={() => {
		window.location.href = '/';
	}}
/>

<NotificationModal
	bind:open={isHostLeft}
	title={$t('common.hostReload')}
	buttonText={$t('common.reEnterRoom')}
	onButtonClick={() => {
		window.location.href = $page.url.href;
	}}
/>

<audio src={doorBell} bind:this={audio} />
