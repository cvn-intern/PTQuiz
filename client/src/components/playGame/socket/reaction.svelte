<script lang="ts">
	import { page } from '$app/stores';
	import { REACTIONS } from '$constants/chat';
	import { EmitChannel, ListenChannel } from '$constants/socketChannel';
	import Icon from '@iconify/svelte';
	import type { Socket } from 'socket.io-client';
	import { onMount, tick } from 'svelte';
	import { t } from '$i18n/translations';
	import Cloud from './cloudHandle/cloud.svelte';

	export let isHost: boolean;
	export let socket: Socket;
	export let participants: any[];
	export let isBattle: boolean;

	type Reaction = {
		user: {
			id: string;
			displayName: string;
			avatar: string;
		};
		message: string | '';
		id: number;
	};

	let reactions: Reaction[] = [];
	let messageContent: string = '';
	let isDisabled: boolean = false;
	let id: number = Math.floor(Math.random() * 90000) + 10000;

	$: console.log(reactions);

	onMount(() => {
		socket.on(EmitChannel.ROOM_REACTIONS, async (data) => {
			reactions = [...reactions, data];
			await tick();
		});
	});

	async function sendReaction() {
		id = Math.floor(Math.random() * 90000) + 10000;
		socket.emit(ListenChannel.SEND_REACTION, {
			id: id,
			message: messageContent,
			roomPIN: $page.params.slug
		});
		messageContent = '';
		timeout(id);
		await tick();
	}

	let isShowReaction: boolean = false;

	function addReaction(reaction: string) {
		messageContent += ` ${reaction}`;
		isShowReaction = false;
	}

	let timerOK = false;

	$: isSending = !timerOK;

	const timeout = (id) => {
		setTimeout(() => {
			timerOK = true;
			reactions = reactions.filter((reaction) => reaction.id !== id);
		}, 2000);
		timerOK = false;
	};
</script>

<div class="fixed left-0 bottom-0 z-60 text-black w-96">
	{#if isHost || isBattle}
		<div class="relative">
			<form
				class="flex justify-center w-full relative pb-1"
				on:submit|preventDefault={sendReaction}
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
</div>

{#if isSending}
	<Cloud {reactions} />
{/if}
