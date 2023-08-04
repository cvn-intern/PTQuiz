<script lang="ts">
	import { page } from '$app/stores';
	import { EmitChannel, ListenChannel } from '$constants/socketChannel';
	import type { Socket } from 'socket.io-client';
	import { onMount, tick } from 'svelte';

	export let socket: Socket;

	type Reaction = {
		content: string | '';
		left: number;
		style: string;
	};

	let reactionsCollection = ['😄', '😍', '🤣', '😊', '🙌'];
	let reactions: Reaction[] = [];
	let selectedReaction: string | '' = '';

	onMount(() => {
		socket.on(EmitChannel.ROOM_REACTIONS, async (data) => {
			reactions = [...reactions, data];
			await tick();
		});
	});

	async function sendReaction() {
		const newReaction: Reaction = {
			content: selectedReaction,
			left: Math.random() * 80,
			style: `
          position: absolute;
          left: ${Math.random() * 80}vw;
          animation: flyAndFade 4s linear forwards;
        `
		};
		socket.emit(ListenChannel.SEND_REACTION, {
			reaction: selectedReaction,
			roomPIN: $page.params.slug
		});
		reactions = [...reactions, newReaction];
		selectedReaction = '';
		await tick();
	}
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-black">
	{#each reactionsCollection as reaction}
		<button
			on:click={() => {
				selectedReaction = reaction;
			}}>{reaction}</button
		>
	{/each}
	<button on:click={sendReaction} class="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
		>Send</button
	>
	{#each reactions as reaction}
		<p class="mt-2 text-center" style={reaction.style}>{reaction.content}</p>
	{/each}
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
