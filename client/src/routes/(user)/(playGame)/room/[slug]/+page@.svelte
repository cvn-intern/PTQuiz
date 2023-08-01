<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Modal, Progressbar } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import QuestionDisplay from '../../../../../components/playGame/questionDisplay.svelte';
	import type { Quiz } from '../../playGame/[quizzesId]/play/quizzes.interface';
	import { TypeQuestion } from '../../../../../libs/constants/typeQuestion';
	import { tweened } from 'svelte/motion';
	import SingleChoiceSocket from '../../../../../components/playGame/socket/singleChoiceSocket.svelte';
	import WaitingRoom from '$components/playGame/socket/waitingRoom.svelte';
	import Loading from '$components/loading.svelte';
	import type { LayoutData } from '../../../../$types';
	import { io } from 'socket.io-client';
	import { createSocket } from '../../../../../libs/socket/socket';
	export let data: LayoutData;
	type Participant = {
		id: string;
		displayName: string;
		avatar: string;
		isHost: boolean;
		point: number;
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
	let questions: Quiz[] = [];
	let selectedReaction: string | null = '';
	let url = $page.url.href;
	let isHost: boolean = false;
	let isPicked = false;

	let original = 20;
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
			socket.emit('join-room', {
				roomPIN: $page.params.slug,
				userId: data.user.id
			});
			socket.emit('is-host', {
				roomPIN: $page.params.slug,
				userId: data.user.id
			});
		}, 1000);
		socket.on('room-users', (data: any) => {
			isLoading = false;
			participants = data;
		});
		socket.on('exception', (data: any) => {
			isLoading = false;
			errorMessage = data.message;
		});
		socket.on('room-messages', (data: any) => {
			const newMessage = {
				participant: {
					id: data.userId,
					displayName: data.userId,
					avatar: data.avatar,
					isHost: data.isHost,
					point: data.point
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
		socket.on('is-host', (data: any) => {
			isHost = data.isHost;
		});
		socket.on('quiz-questions', (data: any) => {
			questions = data;
			isPicked = false;
			original = questions[questionPointer].time;
			timer = tweened(original);
		});
		socket.on('question-pointer', (data: any) => {
			questionPointer = data.questionPointer;
			isPicked = false;
			original = questions[questionPointer].time;
			timer = tweened(original);
		});
		socket.on('score-board', (data: any) => {
			participants = data;
		});
		socket.on('ended', (data: any) => {
			isEndGame = data.isEnded;
		});
	});
	onDestroy(() => {
		socket.emit('leave-room', {
			roomPIN: $page.params.slug,
			userId: data.user.id
		});
		socket.disconnect();
	});
	function startGame() {
		isEndGame = false;
		socket.emit('start-game', {
			roomPIN: $page.params.slug
		});
		socket.emit('get-quiz-questions', {
			roomPIN: $page.params.slug
		});
	}
	const nextQuestion = () => {
		socket.emit('change-question-pointer', {
			questionPointer: questionPointer + 1,
			roomPIN: $page.params.slug
		});
	};

	let isButtonDisabled = false;

	async function sendMessage() {
		if (isButtonDisabled) return;
		socket.emit('send-message', {
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
		socket.emit('end-game', {
			roomPIN: $page.params.slug
		});
	};
</script>

{#if isLoading}
	<div class="bg-greenLight w-full h-screen">
		<Loading />
	</div>
{:else}
	<div class="bg-greenLight w-full h-screen px-4 lg:px-16 py-4">
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
			{#if isHost}
				{#if questionPointer < questions.length - 1}
					<button
						class="h-10 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
						on:click={nextQuestion}>Next</button
					>
				{:else}
					<button
						class="h-10 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
						on:click={endGame}>End game</button
					>
				{/if}
				<button
					class="h-10 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
					on:click={getScoreBoard}>Score board</button
				>
			{/if}
			<div>
				<div class="pt-4">
					<Progressbar progress={stringTimer} size="h-4" color="gray" />
				</div>
				<QuestionDisplay
					quizzesType={questions[questionPointer].type}
					quizzesTitle={questions[questionPointer].title}
				/>
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
							user={data.user}
							{isHost}
						/>
					</div>
				{/if}
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
					<p>{participant.point}</p>
				</div>
			{/each}
		</div>
	</Modal>
{/if}
