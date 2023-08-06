<script lang="ts">
	import { page } from '$app/stores';
	import { REACTIONS } from '$constants/chat';
	import { EmitChannel, ListenChannel } from '$constants/socketChannel';
	import Icon from '@iconify/svelte';
	import type { Socket } from 'socket.io-client';
	import { onMount, tick } from 'svelte';
	import { t } from '$i18n/translations';
	import Cloud from './cloudHandle/cloud.svelte';
	import Message from './message.svelte';
	import DropReaction from './cloudHandle/dropReaction.svelte';

	export let isHost: boolean;
	export let socket: Socket;
	export let participants: any[];
	export let isBattle: boolean;
	export let isShowChat: boolean;

	type Reaction = {
		user: {
			id: string;
			displayName: string;
			avatar: string;
		};
		message: string | '';
		reaction: string | '';
	};

	let reactions: Reaction[] = [];
	let reactionConent: string = '';
	let messageContent: string = '';
	let isDisabled: boolean = false;
	let isShowReaction: boolean = false;

	type Message = {
		user: {
			id: string;
			displayName: string;
			avatar: string;
		};
		content: string;
	};
	let messages: Message[] = [];

	onMount(() => {
		socket.on(EmitChannel.ROOM_MESSAGES, async (data) => {
			messages = [...messages, data];
			await tick();
		});
		socket.on(EmitChannel.ROOM_REACTIONS, async (data) => {
			reactions = [...reactions, data];
			await tick();
		});
	});

	const sendMessage = () => {
		socket.emit(ListenChannel.SEND_MESSAGE, {
			content: messageContent,
			roomPIN: $page.params.slug
		});
		messageContent = '';
	};

	function addReaction(reaction: string) {
		socket.emit(ListenChannel.SEND_REACTION, {
			reaction: reaction,
			roomPIN: $page.params.slug
		});
		isShowReaction = false;
	}

	function splitMessages(messages: Message[], size: number) {
		const spliitedMessage = [];
		for (let i = 0; i < messages.length; i += size) {
			spliitedMessage.push(messages.slice(i, i + size));
		}
		return spliitedMessage;
	}
	let messageSplits: any[] = [];

	$: {
		messageSplits = splitMessages(messages, 5);
	}
</script>

{#if isHost || isBattle}
	<div class={`${isShowChat ? 'hidden' : 'block'} relative w-96`}>
		<form
			class="flex justify-center w-full relative pb-1"
			on:submit|preventDefault={sendMessage}
		>
			<input
				maxlength="80"
				type="text"
				class="border-none rounded-lg w-full p-3 font-semibold"
				placeholder={$t('common.enterYourMessageHere')}
				bind:value={messageContent}
			/>
			<div class="absolute right-0 top-1/2 -translate-y-1/2 px-2 flex gap-1">
				<button
					type="button"
					class="p-1 rounded-xl hover:bg-zinc-200"
					on:click={() => {
						isShowReaction = !isShowReaction;
					}}
				>
					<Icon icon="mdi:emoticon" class="text-3xl text-yellowLogo text-center" />
				</button>
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
			<div class="absolute -top-32 left-0 bg-white {isShowReaction ? '' : 'hidden'}">
				<div class="grid grid-cols-9">
					{#each REACTIONS as reaction}
						<button
							type="button"
							class="w-10 h-10 border hover:bg-gray-500"
							on:click={() => addReaction(reaction)}
							>{reaction}
						</button>
					{/each}
				</div>
			</div>
		</form>
	</div>
{/if}

{#each messageSplits as messageSplit}
	<Cloud messages={messageSplit} />
{/each}

<DropReaction {reactions} />
