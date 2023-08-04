<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import Chat from './chat.svelte';
	import { ListenChannel } from '../../../libs/constants/socketChannel';
	import { t } from '$i18n/translations';
	import Icon from '@iconify/svelte';
	import SettingsRoom from './settingsRoom.svelte';
	type Participant = { id: string; displayName: string; avatar: string; isHost: boolean };

	export let startGame: () => void;
	export let url: string;
	export let participants: Participant[];
	export let isHost: boolean;
	export let socket: Socket;
	export let user: any;
	export let room: any;
	let modalOpen = false;
	$: participantsHost = participants.filter((participant) => participant.isHost)[0];
	$: participantsNotHost = participants.filter((participant) => !participant.isHost);
</script>

<div
	class="flex flex-row gap-4 h-full {isHost
		? 'justify-between'
		: 'justify-center'} p-4 relative bg-room bg-cover"
>
	<div class="w-full flex flex-col justify-between items-center">
		<div>
			<div class="flex flex-col justify-between gap-4">
				<div class="flex flex-col gap-4 justify-center items-center pt-6">
					<div
						class="text-4xl flex items-center gap-2 uppercase text-zinc-700 font-bold text-center"
					>
						{$t('common.waitingForPlayers')}
					</div>
					<div
						class="text-2xl py-2 px-4 text-neutral-700 bg-white/40 border rounded-full flex gap-2"
					>
						<Icon icon="formkit:people" class="text-3xl" />
						{participants.length - 1}
					</div>
					{#if participantsHost}
						<div class="flex flex-col items-center gap-2 w-40 relative mt-2">
							<Icon icon="emojione-v1:crown" class="text-4xl absolute -top-5" />
							<img
								src={participantsHost.avatar}
								alt={participantsHost.displayName}
								class="w-24 h-24 rounded-md"
							/>
							<p class="px-4 bg-white/50 rounded-md font-semibold text-sky-700">
								{participantsHost.displayName}
							</p>
						</div>
					{/if}
				</div>
			</div>
			<div class="w-full flex justify-center">
				<div
					class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 items-center justify-center gap-4 w-screenHalf"
				>
					{#each participantsNotHost as participant (participant.displayName)}
						<div class="flex flex-col items-center gap-2 w-40 p-2">
							<img
								src={participant.avatar}
								alt={participant.displayName}
								class="w-24 h-24 rounded-md"
							/>
							<p class="px-4 bg-white/50 rounded-md">{participant.displayName}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
	{#if isHost}
		<SettingsRoom bind:modalOpen {url} {isHost} {room} {socket} />
	{/if}
	<Chat {participants} {socket} {user} />
	<button
		class="{isHost
			? 'block'
			: 'hidden'} absolute md:bottom-16 bottom-1/3 left-1/2 -translate-x-1/2 xl:w-1/6 sm:w-2/6 w-3/6 h-16 bg-yellowLogo hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded-xl shadow-xl shawdow-yellowLogo/40 border-2 border-gray-200/40 flex justify-center items-center gap-1 uppercase text-3xl"
		on:click={startGame}
	>
		<p>{$t('common.startBtn')}</p>
		<img
			src="https://cdn.pixabay.com/animation/2022/07/31/06/27/06-27-17-124_512.gif"
			class="w-10 h-10"
			alt=""
		/>
	</button>
</div>
