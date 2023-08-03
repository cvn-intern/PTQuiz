<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { EmitChannel, ListenChannel } from '../../../libs/constants/socketChannel';
	import { page } from '$app/stores';
	import Chat from './chat.svelte';
	import { t } from '$i18n/translations';
	import Icon from '@iconify/svelte';
	type Participant = { id: string; displayName: string; avatar: string; isHost: boolean };

	export let startGame: () => void;
	export let url: string;
	export let participants: Participant[];
	export let isHost: boolean;
	export let socket: Socket;
	export let user: any;

	const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=100x100`;
	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		toast.success('Copied to clipboard');
	};
</script>

<div class="flex flex-col gap-4 h-full justify-start p-4">
	<div class="flex flex-col justify-between gap-4">
		<div class="flex flex-col w-full justify-center items-center gap-4 pt-6">
			{#if isHost}
				<div class="flex flex-row justify-between w-full items-center">
					<div class="flex gap-4 items-center">
						<button
							class="h-10 bg-blueLogo/80 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-xl shadow-xl shadow-blueLogo/20 border-2 border-gray-200/40 flex items-center gap-2"
							on:click={handleCopy}
						>
							<Icon icon="icon-park-outline:copy-link" class="text-2xl text-white" />
							<p class="uppercase">{$t('common.clickHereToCopyLink')}</p>
						</button>
						<img class="hidden md:block" width="120px" src={qrCode} alt="" title="" />
					</div>
					<button
						class="h-10 bg-yellowLogo hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded-xl shadow-xl shawdow-yellowLogo/40 border-2 border-gray-200/40 flex items-center gap-1 uppercase"
						on:click={startGame}
					>
						<p>{$t('common.startBtn')}</p>
						<Icon icon="streamline-emojis:rocket" class="text-3xl" />
					</button>
				</div>
			{/if}
		</div>
		<div class="flex flex-col gap-4 justify-center items-center pt-6">
			<div class="text-4xl flex items-center gap-2 uppercase text-zinc-700 font-bold text-center">
				{$t("common.waitingForPlayers")}
			</div>
			<div class="text-2xl py-2 px-4 text-neutral-700 bg-white/40 border rounded-full flex gap-2">
				<Icon icon="formkit:people" class="text-3xl" /> {participants.length}</div>
		</div>
	</div>
	<div class="w-full flex justify-center">
		<div
			class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 items-center justify-center gap-4 w-screenHalf"
		>
			{#each participants as participant (participant.displayName)}
				<div
					class="rounded-xl md:w-48 h-20 flex items-center justify-between text-white p-2 bg-secondary hover:animate-wiggle col-span-1 shadow-xl shadow-secondary/40 border-2 border-gray-200/40"
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
	</div>
	<div class="w-full flex justify-end">
		<Chat {participants} {socket} {user} />
	</div>
</div>
