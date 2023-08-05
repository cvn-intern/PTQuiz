<script lang="ts">
	import Icon from '@iconify/svelte';
	import Message from './message.svelte';
	import MyMessage from './myMessage.svelte';
	import { onMount, tick } from 'svelte';
	import { EmitChannel, ListenChannel } from '../../../libs/constants/socketChannel';
	import type { Socket } from 'socket.io-client';
	import { page } from '$app/stores';
	import { t } from '$i18n/translations';
	export let participants: any[];
	export let user: any;
	export let socket: Socket;
	import logo from '$assets/logo.png';
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
	let element: any;

	const scrollToBottom = async (node: any) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	onMount(async () => {
		scrollToBottom(element);
	});

	onMount(() => {
		socket.on(EmitChannel.ROOM_MESSAGES, async (data) => {
			messages = [...messages, data];
			await tick();
			scrollToBottom(element);
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

	$: isShowChat = false;
	const handleClickOpenChat = () => {
		isShowChat = !isShowChat;
	};
</script>

<div
	class="md:w-96 md:max-w-sm max-w-xs w-screen backdrop-opacity-10 backdrop-invert bg-chat rounded-t-lg shadow-shadowChat {isShowChat
		? 'fixed right-0 bottom-0 z-60'
		: 'hidden'}"
>
	<div class="relative flex flex-col gap-2">
		<div
			class="w-full bg-white py-0.5 flex justify-between h-12 rounded-t-2xl px-3 items-center"
		>
			<img src={logo} alt="" class="w-14 h-14" />
			<button on:click={handleClickOpenChat}
				><Icon icon="mingcute:down-fill" class="text-2xl mr-3 text-zinc-700" /></button
			>
		</div>
		<div
			bind:this={element}
			class="overflow-y-scroll max-h-halfScreen h-halfScreen px-3 no-scrollbar flex flex-col gap-2"
		>
			{#each messages as message}
				{#if message.user.id === user.id}
					<MyMessage message={message.content} avatar={message.user.avatar} />
				{:else}
					<Message message={message.content} avatar={message.user.avatar} />
				{/if}
			{/each}
		</div>
		<form
			class="flex justify-center w-full relative pb-1"
			on:submit|preventDefault={sendMessage}
		>
			<input
				maxlength="80"
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
	</div>
</div>
<button
	on:click={handleClickOpenChat}
	class="shadow-lg shadow-darkGreen/30 rounded-full backdrop-opacity-10 backdrop-invert bg-secondary text-white border-2 border-gray-300 font-semibold p-2 {isShowChat
		? 'hidden'
		: 'fixed right-2 md:right-10 bottom-10 z-60 '}"
>
	<Icon icon="et:chat" class="text-4xl" />
</button>
