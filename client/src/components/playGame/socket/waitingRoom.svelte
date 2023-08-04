<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import toast from 'svelte-french-toast';
	import Chat from './chat.svelte';
	import { t } from '$i18n/translations';
	import Icon from '@iconify/svelte';
	import ImageModal from '../singlePlay/imageModal.svelte';
	type Participant = { id: string; displayName: string; avatar: string; isHost: boolean };

	export let startGame: () => void;
	export let url: string;
	export let participants: Participant[];
	export let isHost: boolean;
	export let socket: Socket;
	export let user: any;
	$: isPublic = true;
	$: size = modalOpen ? '500x500' : '100x100';
	const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=${size}`;
	const handleCopy = () => {
		navigator.clipboard.writeText(url);
		toast.success('Copied to clipboard');
	};
	let modalOpen = false;
	$: participantsHost = participants.filter((participant) => participant.isHost)[0];
	$: participantsNotHost = participants.filter((participant) => !participant.isHost);
	let valuePassword = '123456';
	const handleCopyPassword = () => {
		navigator.clipboard.writeText(valuePassword);
		toast.success('Copied to clipboard');
	};
</script>

<div
	class="flex flex-row gap-4 h-full {isHost ? 'justify-between' : 'justify-center'} p-4 relative bg-room bg-cover"
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
					<div class="flex flex-col items-center gap-2 w-40 relative mt-2">
						<Icon icon="emojione-v1:crown" class="text-4xl absolute -top-5" />
						<img
							src="https://media2.giphy.com/media/iI4yl51ZcrhI3MCtzD/giphy.gif?cid=ecf05e470v04nwqq7w1kozrwj4ugcx8flr1ol0nv4d55349w&ep=v1_gifs_related&rid=giphy.gif&ct=s"
							alt={participantsHost.displayName}
							class="w-24 h-24 rounded-md"
						/>
						<p class="px-4 bg-white/50 rounded-md font-semibold text-sky-700">
							{participantsHost.displayName}
						</p>
					</div>
				</div>
			</div>
			<div class="w-full flex justify-center">
				<div
					class="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 items-center justify-center gap-4 w-screenHalf"
				>
					{#each participantsNotHost as participant (participant.displayName)}
						<div class="flex flex-col items-center gap-2 w-40 p-2">
							<img
								src="https://media4.giphy.com/media/XodmZ5OSlGu5jIRMrH/giphy.gif?cid=ecf05e47mdnh5ksdp0mqk5axyuv96cb89wsj2hs332qus791&ep=v1_gifs_related&rid=giphy.gif&ct=s"
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
		<div class="absolute md:top-0 md:right-2 bottom-0">
			<div
				class="flex flex-col w-full justify-center items-center gap-4 md:pt-6 pt-0 {isHost
					? 'block'
					: 'hidden'}"
			>
				<button
					on:click={() => {
						const screenWidth = window.innerWidth;
						if (screenWidth >= 768) {
							modalOpen = true;
						}
					}}
				>
					<img class="hidden md:block" width="200px" src={qrCode} alt="" title="" />
				</button>
				<ImageModal bind:modalOpen imageSrc={qrCode} />
				<div class="flex flex-col items-center justify-between w-full gap-4">
					<div class="flex items-center justify-between w-full">
						<button
							class="p-2 bg-slate-50/30 shadow-xl rounded-sm"
							on:click={handleCopy}
						>
							<Icon
								icon="icon-park-outline:copy-link"
								class="text-3xl text-sky-700"
							/>
						</button>
						<button
							class="p-2 bg-slate-50/30 shadow-xl rounded-sm"
							on:click={() => {
								isPublic = !isPublic;
							}}
						>
							<Icon
								icon={isPublic ? 'zondicons:lock-open' : 'zondicons:lock-closed'}
								class={`text-3xl  ${isPublic ? 'text-green-500' : 'text-red-500'}`}
							/>
						</button>
					</div>
					<p
						class="tracking-widest bg-purple-300/30 py-2 px-2 text-purple-400 font-bold shadow-md rounded w-full text-2xl flex items-center justify-between {isPublic
							? 'hidden'
							: 'block'}"
					>
						<span>{valuePassword}</span>
						<button
							class="border p-2 rounded-md shadow-lg bg-white/30"
							on:click={handleCopyPassword}
						>
							<Icon icon={'solar:copy-broken'} class="text-white" />
						</button>
					</p>
				</div>
			</div>
		</div>
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
