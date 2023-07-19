<script lang="ts">
	import { onMount } from 'svelte';
	import socket from '../../../libs/socket/socket';
	import { page } from '$app/stores';
	import type { LayoutData } from '../../$types';
	import { goto } from '$app/navigation';
	import { Spinner } from 'flowbite-svelte';
	export let data: LayoutData;

	type Participant = { id: string; displayName: string; avatar: string };
	type Message = {
		participant: Participant;
		content: string;
		reaction: string | null;
		id: number;
		left: number;
		style: string;
	};

	let isLoading = true,
		errorMessage = '',
		participants: Participant[] = [],
		messages: Message[] = [],
		messageContent = '',
		reactions = ['😄', '😍', '🤣', '😊', '🙌'],
		selectedReaction: string | null = null;

	onMount(() => {
		setTimeout(() => {
			socket.emit('join-room', { roomPIN: $page.params.slug, userId: data.user.id });
		}, 500);

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
				participant: { id: data.userId, displayName: data.userId, avatar: data.avatar },
				content: data.message,
				reaction: data.reaction,
				id: Date.now(),
				left: Math.random() * 80,
				style: `position: absolute; left: ${
					Math.random() * 80
				}vw; animation: flyAndFade 20s linear forwards;`
			};
			messages = [...messages, newMessage];
		});
	});

	function startGame() {}
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
</script>

{#if isLoading}
	<div class="fixed inset-0 flex items-center justify-center w-full">
		<Spinner size={'48'} color="green" />
	</div>
{:else}
	<div
		class="w-full flex flex-col flex-grow items-center justify-center min-h-full text-black gap-4"
	>
		{#if errorMessage}
			<h1>{errorMessage}</h1>
		{:else}
			<div class="flex flex-col justify-between w-full h-full">
				<div class="flex flex-col w-full justify-center items-center">
					<div class="px-4 lg:px-16 py-4 flex flex-row justify-between w-full">
						<div class="flex gap-4">
							<button
								class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
								on:click={startGame}>Link</button
							>
							<button
								class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
								on:click={startGame}>QrCode</button
							>
						</div>
						<button
							class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
							on:click={startGame}>Start</button
						>
					</div>
					<div class="flex flex-col gap-4 justify-center items-center">
						<div class="text-4xl">Welcome to the game!</div>
						<div class="text-2xl">Participants: {participants.length}</div>
					</div>
				</div>
				<div class="h-full">
					<div class="flex flex-wrap items-start">
						{#each participants as participant (participant.displayName)}
							<div
								class="w-48 h-20 m-4 flex items-center justify-between text-white p-2 rounded animate-bounce bg-secondary"
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
					<div class="text-center">
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
						animation: balloons 4s ease-in-out infinite;
						transform-origin: bottom center;
					}
					@keyframes balloons {
						0%,
						100% {
							transform: translateY(0) rotate(-4deg);
						}
						50% {
							transform: translateY(-25px) rotate(4deg);
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
						height: 250px;
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
