<script lang="ts">
	import { onMount, tick } from 'svelte';
	import socket from '../../../libs/socket/socket';
	import { page } from '$app/stores';
	import type { LayoutData } from '../../$types';
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
	let error: string = '';
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
		socket.emit('join-room', {
			roomPIN: $page.params.slug,
			userId: data.user.id
		});
		socket.on('room-users', (data) => {
			participants = data;
		});
		socket.on('exception', (data) => {
			error = data.message;
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
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-black">
	<h1 class="text-4xl mb-8">Welcome to the Game!</h1>
	<h2 class="text-2xl mb-8">Participants: {participants.length}</h2>
	<div class="flex flex-wrap justify-center">
		{#each participants as participant (participant.displayName)}
			<div
				class="w-48 h-20 m-4 flex items-center justify-between bg-green-500 text-white p-2 rounded animate-bounce"
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
	<button
		class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-8"
		on:click={startGame}>Start</button
	>
	<div class="mt-8">
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
</div>
