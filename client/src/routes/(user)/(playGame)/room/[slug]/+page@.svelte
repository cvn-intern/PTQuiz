<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import socket from '../../../../../libs/socket/socket';
	import { page } from '$app/stores';
	import { Modal, Progressbar, Spinner } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';
	import QuestionDisplay from '../../../../../components/playGame/questionDisplay.svelte';
	import type { Quiz } from '../../playGame/[quizzesId]/play/quizzes.interface';
	import { TypeQuestion } from '../../../../../libs/constants/typeQuestion';
	import { tweened } from 'svelte/motion';
	import SingleChoiceSocket from '../../../../../components/playGame/socket/singleChoiceSocket.svelte';

	export let data;

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
	let questionPointer: number = 0;
	let isLoading: boolean = true;
	let showModal: boolean = false;
	let showScoreBoard: boolean = false;
	let errorMessage: string = '';
	let participants: Participant[] = [];
	let messages: Message[] = [];
	let messageContent: string = '';
	let questions: Quiz[] = [];
	let reactions = ['😄', '😍', '🤣', '😊', '🙌'];
	let selectedReaction: string | null = null;
	let url = $page.url.href;
	let isHost: boolean = false;
	let isPicked = false;
	const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=100x100`;

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
		socket.on('room-users', (data) => {
			isLoading = false;
			participants = data;
		});
		socket.on('exception', (data) => {
			isLoading = false;
			errorMessage = data.message;
		});
		socket.on('room-messages', (data) => {
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
		socket.on('is-host', (data) => {
			isHost = data.isHost;
		});
		socket.on('quiz-questions', (data) => {
			questions = data;
			isPicked = false;
			original = questions[questionPointer].time;
			timer = tweened(original);
		});
		socket.on('question-pointer', (data) => {
			questionPointer = data.questionPointer;
			isPicked = false;
			original = questions[questionPointer].time;
			timer = tweened(original);
		});
		socket.on('score-board', (data) => {
			participants = data;
		});
	});
	$: {
		console.log(participants);
	}
	onDestroy(() => {
		socket.emit('leave-room', {
			roomPIN: $page.params.slug,
			userId: data.user.id
		});
	});
	function startGame() {
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

	async function sendMessage() {
		socket.emit('send-message', {
			roomPIN: $page.params.slug,
			userId: data.user.id,
			avatar: data.user.avatar,
			message: messageContent,
			reaction: selectedReaction
		});
		messageContent = '';
		selectedReaction = null;
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
</script>

{#if isLoading}
	<div class="relative inset-0 flex items-center justify-center w-full">
		<Spinner size={'48'} color="green" />
	</div>
{:else}
	<div
		class="bg-greenLight w-full flex flex-col flex-grow items-center justify-center min-h-full text-black px-4 lg:px-16 py-4 gap-4"
	>
		{#if errorMessage}
			<h1>{errorMessage}</h1>
		{:else if questions.length > 0}
			{#if isHost}
				<button
					class="h-10 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
					on:click={nextQuestion}>Next</button
				>
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
			<div class="flex flex-col justify-between w-full h-full gap-4">
				<div class="flex flex-col w-full justify-center items-center gap-4">
					{#if isHost}
						<div class="flex flex-row justify-between w-full items-center">
							<div class="flex gap-4 items-center">
								<button
									class="h-10 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
									on:click={handleCopy}>Click here to copy link</button
								>
								<img
									class="hidden md:block"
									width="120px"
									src={qrCode}
									alt=""
									title=""
								/>
							</div>
							<button
								class="h-10 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
								on:click={startGame}>Start</button
							>
						</div>
					{/if}
					<div class="flex flex-col gap-4 justify-center items-center">
						<div class="text-4xl">Waiting for players...</div>
						<div class="text-2xl">Participants: {participants.length}</div>
					</div>
				</div>
				<div class="md:h-full">
					<div class="hidden md:flex flex-wrap items-center justify-center gap-4">
						{#each participants as participant (participant.displayName)}
							<div
								class="rounded-xl w-48 h-20 flex items-center justify-between text-white p-2 bg-secondary hover:animate-wiggle"
							>
								<p class="truncate w-32">{participant.displayName}</p>
								<img
									src={participant.avatar}
									alt={participant.displayName}
									class="w-10 h-10 rounded-full ml-4"
								/>
							</div>
						{/each}
					</div>
					<div class="flex justify-center h-full items-center md:hidden">
						You can chat, throw react, and see others participants name on host screen
					</div>
				</div>
			</div>
			<div>
				<form on:submit|preventDefault={sendMessage} class="flex items-center space-x-2">
					<input
						bind:value={messageContent}
						placeholder="Type a message..."
						class="border-2 border-blue-500 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-700 transition-colors duration-200 ease-in-out"
					/>
					<div class="relative group">
						<button
							on:click={() => {
								selectedReaction = reactions[0];
							}}
							class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl focus:outline-none"
							>{reactions[0]}</button
						>
						<div
							class="absolute left-0 mt-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
						>
							{#each reactions.slice(1) as reaction}
								<button
									on:click={() => {
										selectedReaction = reaction;
									}}
									class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl focus:outline-none"
									>{reaction}</button
								>
							{/each}
						</div>
					</div>
					<button
						type="submit"
						class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</button>
				</form>
			</div>
			<style>
				@keyframes flyAndFade {
					0% {
						transform: translateY(30vh);
						opacity: 1;
					}
					100% {
						transform: translateY(0vh);
						opacity: 0;
					}
				}
			</style>
			{#each messages as message (message.id)}
				<div class="balloon flex items-center relative" style={message.style}>
					<img
						src={message.participant.avatar}
						alt={message.participant.displayName}
						class="w-12 h-12 rounded-full mr-2"
					/>
					<div class="text-center truncate">
						<p>{message.content} {message.reaction}</p>
					</div>
				</div>

				<style>
					body {
						background: hsl(70, 31%, 85%);
						text-align: center;
					}
					.balloon {
						display: inline-block;
						width: 120px;
						height: 145px;
						background: hsl(215, 50%, 65%);
						border-radius: 80%;
						position: relative;
						box-shadow: inset -10px -10px 0 rgba(0, 0, 0, 0.07);
						margin: 20px 30px;
						transition: transform 0.5s ease;
						z-index: 10;
						animation: balloons 1s ease-in-out infinite;
						transform-origin: bottom center;
					}
					@keyframes balloons {
						0%,
						100% {
							transform: translateY(0px) rotate(-4deg);
						}
						50% {
							transform: translateY(-20px) rotate(4deg);
						}
					}
					.balloon:before {
						content: '▲';
						font-size: 20px;
						color: hsl(215, 30%, 50%);
						display: block;
						text-align: center;
						width: 100%;
						position: absolute;
						bottom: -12px;
						z-index: -100;
					}
					.balloon:after {
						display: inline-block;
						top: 153px;
						position: absolute;
						height: 50px;
						width: 1px;
						margin: 0 auto;
						content: '';
						background: rgba(0, 0, 0, 0.2);
					}
				</style>
			{/each}
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
