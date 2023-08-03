<script lang="ts">
	import Icon from '@iconify/svelte';
	import Message from './message.svelte';
	import MyMessage from './myMessage.svelte';
	import { REACTIONS } from '$constants/chat';
	import { onMount } from 'svelte';
	import { EmitChannel, ListenChannel } from '../../../libs/constants/socketChannel';
	import type { Socket } from 'socket.io-client';
	import { page } from '$app/stores';
	export let participants: any[];
	export let user: any;
	export let socket: Socket;
	type Message = {
		user: {
			id: string;
			displayName: string;
			avatar: string;
		};
		content: string;
	};
	let messages: Message[] = [];
	let messageContent: string;
	let isDisabled = false;

	onMount(() => {
		socket.on(EmitChannel.ROOM_MESSAGES, (data) => {
			messages = [...messages, data];
		});
	});

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

	$: isShowReaction = false;
	$: isShowChat = true;
	const handleClickOpenChat = () => {
		isShowChat = !isShowChat;
	};
</script>

<div
	class="md:w-96 md:max-w-sm max-w-xs backdrop-opacity-10 backdrop-invert bg-greenLight shadow-lg rounded-t-lg {isShowChat
		? 'fixed right-0 top-0 z-60'
		: 'hidden'}"
>
	<div class="relative flex flex-col gap-4">
		<div class="overflow-y-scroll max-h-screen h-screen p-3">
			{#each messages as message}
				{#if message.user.id === user.id}
					<MyMessage
						message={message.content}
						displayName={message.user.displayName}
						avatar={message.user.avatar}
					/>
				{:else}
					<Message
						message={message.content}
						displayName={message.user.displayName}
						avatar={message.user.avatar}
					/>
				{/if}
			{/each}
		</div>
		<form
			class="flex justify-center absolute bottom-0 w-full"
			on:submit|preventDefault={sendMessage}
		>
			<input
				maxlength="100"
				type="text"
				class="border-none rounded-lg w-full p-3 font-semibold"
				placeholder="Enter message here..."
				bind:value={messageContent}
			/>
			<div class="absolute right-0 top-1/2 -translate-y-1/2 px-2">
				<button
					type="button"
					class="border-2 bg-indigo-50 p-1 rounded-xl"
					on:click={() => {
						isShowReaction = !isShowReaction;
					}}
				>
					<Icon icon="mdi:emoticon" class="text-3xl text-yellowLogo text-center" />
				</button>
				<button
					disabled={isDisabled}
					type="submit"
					class={`bg-indigo-800 p-1 rounded-xl ${
						isDisabled ? 'opacity-50 cursor-not-allowed' : ''
					}`}
				>
					<Icon
						icon="fluent:send-16-filled"
						class="text-3xl text-white text-center p-1"
					/>
				</button>
			</div>
			<div class="absolute -top-32 left-0 bg-white {isShowReaction ? '' : 'hidden'}">
				<div class="grid grid-cols-9">
					{#each REACTIONS as reaction}
						<button type="button" class="w-10 h-10 border hover:bg-gray-500"
							>{reaction}
						</button>
					{/each}
				</div>
			</div>
		</form>
		<div class="absolute md:right-8 right-3 top-2 z-60">
			<button on:click={handleClickOpenChat}
				><Icon icon="pixelarticons:close" class="text-2xl border"/></button
			>
		</div>
	</div>
</div>
<button
	on:click={handleClickOpenChat}
	class="backdrop-opacity-10 backdrop-invert h-10 bg-purple-400/30 md:w-96 text-white border-2 border-gray-300 font-semibold px-2 {isShowChat
		? 'hidden'
		: 'fixed right-0 bottom-0 z-60 '}"
>
	<div class="flex justify-center items-center gap-2">
		<Icon icon="et:chat" class="text-2xl" />
		<p>Open chat here</p>
	</div>
</button>
