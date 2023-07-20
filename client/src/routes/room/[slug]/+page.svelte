<script lang="ts">
	import { onMount, tick } from 'svelte';
	import socket from '../../../libs/socket/socket';
	import { page } from '$app/stores';
	import type { LayoutData } from '../../$types';
	import { goto } from '$app/navigation';
	import { Spinner } from 'flowbite-svelte';
	import toast from 'svelte-french-toast';

	export let data: LayoutData;
	type Participant = {
		id: string;
		displayName: string;
		avatar: string;
	};
	type Message = {
		participant: Participant;
		content: string;
		reaction: string | null;
		id: number;
		left: number;
		style: string;
	};
	let isLoading: boolean = true;
	let errorMessage: string = '';
	let url = $page.url.href;
	const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=100x100`;
	let participants: Participant[] = [];
	let messages: Message[] = [];
	let messageContent: string = '';
	let reactions = ['😄', '😍', '🤣', '😊', '🙌'];
	let selectedReaction: string | null = null;
	function getNewParticipant(): Participant {
		const id = participants.length + 1;
		return {
			id: id.toString(),
			displayName: `Participant ${id}`,
			avatar: `https://avatars.dicebear.com/api/avataaars/${id}.svg`
		};
	}

	onMount(() => {
		if (!data.user) {
			goto('/login');
			return;
		}
		setTimeout(() => {
			socket.emit('join-room', {
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
	});
	function startGame() {}
	async function sendMessage() {
		const newMessage: Message = {
			participant: participants[participants.length - 1],
			content: messageContent,
			reaction: selectedReaction,
			id: Date.now(),
			left: Math.random() * 80, // Random value between 0 and 80
			style: `
				position: absolute;
				left: ${Math.random() * 80}vw;
				animation: flyAndFade 4s linear forwards;
			`
		};
		messages = [...messages, newMessage];
		messageContent = '';
		selectedReaction = null;
		await tick(); // Wait for the DOM to update
	}
	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		toast.success('Copied to clipboard');
	};
</script>

{#if isLoading}
	<div class="fixed inset-0 flex items-center justify-center w-full">
		<Spinner size={'48'} color="green" />
	</div>
{:else}
	<div
		class="w-full flex flex-col flex-grow items-center justify-center min-h-full text-black px-4 lg:px-16 py-4 gap-4"
	>
		{#if errorMessage}
			<h1>{errorMessage}</h1>
		{:else}
			<div class="flex flex-col justify-between w-full h-full gap-4">
				<div class="flex flex-col w-full justify-center items-center gap-4">
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
			<div class="">
				<input
					bind:value={messageContent}
					placeholder="Type a message..."
					class="border rounded px-2 py-1 w-64"
				/>
				{#each reactions as reaction}
					<button
						on:click={() => {
							selectedReaction = reaction;
						}}>{reaction}</button
					>
				{/each}
				<button on:click={sendMessage} class="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
					>Send</button
				>
			</div>
			<style>
				@keyframes flyAndFade {
					0% {
						transform: translateY(0);
						opacity: 1;
					}
					100% {
						transform: translateY(-100vh);
						opacity: 0;
					}
				}
			</style>
			{#each messages as message (message.id)}
				<div class="bg-green-500 text-white p-2 rounded-full" style={message.style}>
					<img
						src={message.participant.avatar}
						alt={message.participant.displayName}
						class="w-12 h-12 rounded-full"
					/>
					<p class="mt-2 text-center">{message.content} {message.reaction}</p>
				</div>
			{/each}
		{/if}
	</div>
{/if}
