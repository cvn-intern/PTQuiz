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

	$: isShowChat = true;
	const handleClickOpenChat = () => {
		isShowChat = !isShowChat;
	};
</script>

<div
	class="md:w-96 md:max-w-sm max-w-xs backdrop-opacity-10 backdrop-invert bg-greenLight rounded-t-lg shadow-2xl {isShowChat
		? 'fixed right-0 bottom-0 z-60'
		: 'hidden'}"
>
	<div class="relative flex flex-col gap-4">
		<div class="overflow-y-scroll max-h-halfScreen h-halfScreen px-3 pt-7">
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
			<div class="absolute right-0 top-1/2 -translate-y-1/2 px-2 flex gap-1">
				<button
					disabled={isDisabled}
					type="submit"
					class={`bg-darkGreen rounded-xl hover:bg-secondary p-1 ${
						isDisabled ? 'opacity-50 cursor-not-allowed' : ''
					}`}
				>
					<Icon
						icon="fluent:send-16-filled"
						class="text-3xl text-white text-center p-1"
					/>
				</button>
			</div>
		</form>
		<div class="absolute right-0 z-60 w-full bg-white rounded-md py-0.5 flex justify-end">
			<button on:click={handleClickOpenChat}
				><Icon icon="pajamas:close-xs" class="text-2xl mr-3 text-zinc-700" /></button
			>
		</div>
	</div>
</div>
<button
	on:click={handleClickOpenChat}
	class="shadow-lg rounded-xl backdrop-opacity-10 backdrop-invert h-10 bg-darkGreen md:w-96 text-white border-2 border-gray-300 font-semibold px-2 {isShowChat
		? 'hidden'
		: 'fixed right-0 bottom-0 z-60 '}"
>
	<div class="flex justify-center items-center gap-2">
		<Icon icon="et:chat" class="text-2xl" />
		<p>Open chat here</p>
	</div>
</button>
