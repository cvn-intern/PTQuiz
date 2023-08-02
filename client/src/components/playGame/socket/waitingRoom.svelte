<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { EmitChannel, ListenChannel } from '../../../libs/constants/socketChannel';
	import { page } from '$app/stores';
	type Participant = { id: string; displayName: string; avatar: string; isHost: boolean };
	type Message = {
		user: {
			id: string;
			displayName: string;
			avatar: string;
		};
		content: string;
	};
	export let startGame: () => void;
	export let url: string;
	export let participants: Participant[];
	export let isHost: boolean;
	export let socket: Socket;
	let messages: Message[] = [];
	let messageContent: string;
	let isDisabled = false;
	onMount(() => {
		socket.on(EmitChannel.ROOM_MESSAGES, (data) => {
			messages = [...messages, data];
		});
	});
	const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=100x100`;
	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		toast.success('Copied to clipboard');
	};
	const sendMessage = () => {
		isDisabled = true;
		setTimeout(() => {
			isDisabled = false;
		}, 3000);
		socket.emit(ListenChannel.SEND_MESSAGE, {
			content: messageContent,
			roomPIN: $page.params.slug
		});
		messageContent = '';
	};
</script>

<div class="flex flex-col gap-4 h-full justify-center">
	<div class="flex flex-col justify-between gap-4">
		<div class="flex flex-col w-full justify-center items-center gap-4">
			{#if isHost}
				<div class="flex flex-row justify-between w-full items-center">
					<div class="flex gap-4 items-center">
						<button
							class="h-10 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
							on:click={handleCopy}>Click here to copy link</button
						>
						<img class="hidden md:block" width="120px" src={qrCode} alt="" title="" />
					</div>
					<button
						class="h-10 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
						on:click={startGame}>Start</button
					>
				</div>
			{/if}
		</div>
		<div class="flex flex-col gap-4 justify-center items-center">
			<div class="text-4xl">Waiting for players...</div>
			<div class="text-2xl">Participants: {participants.length}</div>
		</div>
	</div>
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
	<div class="flex flex-col items-center">
		<form class="flex items-center space-x-2" on:submit|preventDefault={sendMessage}>
			<input
				bind:value={messageContent}
				name="message"
				placeholder="Type a message..."
				class="border-2 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-700 transition-colors duration-200 ease-in-out"
			/>
			<button
				disabled={isDisabled}
				type="submit"
				class={`w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-2xl focus:outline-none ${
					isDisabled ? 'opacity-50 cursor-not-allowed' : ''
				}`}
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
</div>
