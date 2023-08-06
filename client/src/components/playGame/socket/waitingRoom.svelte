<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import Chat from './chat.svelte';
	import { EmitChannel, ListenChannel } from '../../../libs/constants/socketChannel';
	import { t } from '$i18n/translations';
	import Icon from '@iconify/svelte';
	import SettingsRoom from './settingsRoom.svelte';
	import { onMount } from 'svelte';
	import { RoomType } from '$components/quizzes/room.enum';
	import whiteVersusMobile from '$assets/whiteVersusMobile.png';
	import whiteVersus from '$assets/whiteVersus.png';
	import { goto } from '$app/navigation';
	import clsx from 'clsx';
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

	$: participantsBattle = participants.filter((participant) => !participant.isHost)[0];

	$: isKicking = participantsNotHost.map((participant) => {
		return {
			id: participant.id,
			isKicking: false
		};
	});
	let count = room.room.count;
	const kickUser = (id: string, index: any) => {
		isKicking = isKicking.map((participant) => {
			if (participant.id === id) {
				participant.isKicking = true;
			}
			return participant;
		});
		socket.emit(ListenChannel.KICK_USER, {
			participantId: id,
			roomId: room.id
		});
	};
	let isShowKick = false;
	let screenWidth: number;
</script>

<svelte:window bind:innerWidth={screenWidth} />

{#if room.room.type === RoomType.BATTLE}
	<div class=" bg-room bg-cover w-full h-screen">
		<div class="flex flex-col md:flex-row w-full h-full pb-32 px-10">
			<div
				class="flex flex-col pt-10 justify-center md:justify-start items-center gap-2 relative mt-2 md:w-1/3 h-1/3 md:h-full"
			>
				<img
					src={participantsHost.avatar}
					alt={participantsHost.displayName}
					class="w-full h-full md:h-1/3 rounded-md"
				/>
				<p class="px-4 bg-white/50 rounded-md font-semibold text-sky-700 text-3xl">
					{participantsHost.displayName}
				</p>
			</div>
			<div
				class="flex justify-center items-centertext-9xl md:w-1/3 h-1/3 py-10 md:py-0 md:h-full"
			>
				{#if screenWidth <= 768}
					<img src={whiteVersusMobile} alt="vs" class="w-full h-full" />
				{:else}
					<img src={whiteVersus} alt="vs" class="w-full h-screen" />
				{/if}
			</div>
			{#if participantsBattle}
				<div
					class="flex flex-col justify-end items-center gap-2 relative mt-2 md:w-1/3 h-1/3 md:h-full"
				>
					<img
						src={participantsBattle.avatar}
						alt={participantsBattle.displayName}
						class="w-full h-full md:h-1/3 rounded-md"
					/>
					<p class="px-4 bg-white/50 rounded-md font-semibold text-sky-700 text-3xl">
						{participantsBattle.displayName}
					</p>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div
		class="flex flex-row gap-4 h-full {isHost
			? 'justify-between'
			: 'justify-center'} p-4 relative bg-room bg-cover"
	>
		<div class="w-full flex flex-col justify-between items-center">
			<div>
				<div class="flex flex-col justify-between gap-4">
					<div class="flex flex-col gap-4 justify-center items-center md:pt-6 pt-8">
						<div
							class="hidden text-4xl md:flex items-center gap-2 uppercase text-zinc-700 font-bold text-center"
						>
							{$t('common.waitingForPlayers')}
						</div>
						<div
							class="text-2xl py-2 px-4 text-neutral-700 bg-white/40 border rounded-full flex gap-2"
						>
							<Icon icon="formkit:people" class="text-3xl" />
							{participants.length}/{count}
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
				<div
					class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 items-center justify-center gap-4 md:w-screenHalf w-full max-h-attempt md:max-h-halfScreen overflow-y-scroll no-scrollbar"
				>
					{#each participantsNotHost as participant, index}
						<div
							class="flex flex-col items-center gap-2 w-40 p-2 relative group/item hover:bg-transparent cursor-pointer"
						>
							<img
								src={participant.avatar}
								alt={participant.displayName}
								class="w-24 h-24 rounded-md"
							/>
							<p class="px-4 bg-white/50 rounded-md font-semibold text-sky-700">
								{participant.displayName}
							</p>
							{#if isHost}
								<button
									disabled={isKicking[index].isKicking}
									class={` text-white font-bold py-2 px-4 rounded-xl shadow-xl absolute right-0 group/edit invisible hover:bg-white/30 group-hover/item:visible ${
										isKicking[index].isKicking
											? 'group-hover/edit:text-gray-700 cursor-wait animate-pulse'
											: ''
									}`}
									on:click={() => {
										kickUser(participant.id, index);
									}}
								>
									<Icon icon="foundation:x" class="text-red-600 text-xl" />
								</button>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
<button
	class="absolute top-4 left-2"
	on:click={() => {
		goto('/');
	}}
>
	<Icon icon="tabler:home" class="w-10 h-10 text-darkGreen" />
</button>
{#if isHost}
	<SettingsRoom bind:modalOpen {url} {isHost} {room} {socket} bind:count />
{/if}
<Chat {participants} {socket} {user} />

<button
	class={clsx(
		isHost ? 'block' : 'hidden',
		'absolute md:bottom-10 bottom-3 left-1/2 -translate-x-1/2 xl:w-1/6 sm:w-2/6 w-3/6 h-16 bg-yellowLogo hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded-xl shadow-xl shawdow-yellowLogo/40 border-2 border-gray-200/40 flex justify-center items-center gap-3 uppercase text-3xl',
		{
			'cursor-not-allowed opacity-50': participants.length === 1
		}
	)}
	on:click={startGame}
>
	<img
		src="https://cdn.pixabay.com/animation/2022/07/31/06/27/06-27-17-124_512.gif"
		class="w-10 h-10"
		alt=""
	/>
	<p>{$t('common.startBtn')}</p>
	<img
		src="https://cdn.pixabay.com/animation/2022/07/31/06/27/06-27-17-124_512.gif"
		class="w-10 h-10"
		alt=""
	/>
</button>
