<script lang="ts">
	import Icon from '@iconify/svelte';
	import ImageModal from '../singlePlay/imageModal.svelte';
	import toast from 'svelte-french-toast';
	import type { Socket } from 'socket.io-client';
	import { EmitChannel, ListenChannel } from '../../../libs/constants/socketChannel';
	import { onMount } from 'svelte';
	import { t } from '$i18n/translations';
	import { RoomType } from '../../quizzes/room.enum';
	export let modalOpen: boolean;
	export let isHost: boolean;
	export let url: string;
	export let room: any;
	export let socket: Socket;
	export let count: number;
	export let isChangedCount: boolean;

	enum RoomCount {
		FIVE = 2,
		TEN = 10,
		FIFTEEN = 15
	}
	let isCopied = false;
	let isChangedVisibility = false;
	let qrModalOpen = false;
	let isPublic = room.room.isPublic;
	let screenWidth: number;
	$: size = modalOpen ? '500x500' : '100x100';
	const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=${size}`;
	const handleCopy = () => {
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 2000);
		navigator.clipboard.writeText(url);
		toast.success(t.get('common.copiedToClipboard'));
	};
	let valuePassword = room.roomPassword;
	onMount(() => {
		socket.on(EmitChannel.IS_PRIVATE_ROOM, (data) => {
			isPublic = data.isPublic;
			isChangedVisibility = false;
		});
	});
	const handleCopyPassword = () => {
		navigator.clipboard.writeText(valuePassword);
		toast.success(t.get('common.copiedToClipboard'));
	};
	const handleModal = () => {
		modalOpen = !modalOpen;
	};

	const changeRoomVisibility = () => {
		isChangedVisibility = true;
		socket.emit(ListenChannel.SET_PRIVATE_ROOM, {
			roomId: room.room.id,
			isPublic: !isPublic
		});
	};
</script>

<svelte:window bind:innerWidth={screenWidth} />

<button class="absolute top-4 right-4" on:click={handleModal}>
	<Icon icon="material-symbols:settings-outline" class="w-10 h-10 text-darkGreen" />
</button>

{#if modalOpen}
	<div
		class="absolute md:top-10 md:right-4 right-4 top-14 md:bg-transparent bg-black/80 rounded-lg p-2"
	>
		<div
			class="flex flex-col w-full md:justify-center justify-start items-center gap-4 md:pt-6 pt-0 {isHost
				? 'flex'
				: 'hidden invisible'}"
		>
			<button
				class="hidden md:block"
				on:click={() => {
					if (screenWidth >= 768) {
						modalOpen = true;
					}
				}}
			>
				<button
					on:click={() => {
						if (screenWidth >= 768) {
							qrModalOpen = true;
						}
					}}
				>
					<img class="hidden md:block" width="200px" src={qrCode} alt="" title="" />
				</button>
			</button>
			<ImageModal bind:modalOpen={qrModalOpen} imageSrc={qrCode} />
			<div class="flex flex-col justify-between w-full gap-4">
				<div class="flex flex-row-reverse items-center justify-between w-full h-12 gap-1">
					<button
						disabled={isCopied}
						class={`p-2 bg-slate-50/30 shadow-xl rounded-lg h-full ${
							isCopied ? 'cursor-not-allowed opacity-50' : ''
						}`}
						on:click={handleCopy}
					>
						<Icon icon="icon-park-outline:copy-link" class="text-3xl text-sky-700" />
					</button>
					{#if room.room.type === RoomType.GROUP}
						<div class=" bg-slate-50/30 shadow-xl rounded-lg h-full flex items-center">
							<span class="mr-1 ml-2 md:text-zinc-700 text-white font-semibold"
								>{$t('common.limitUser')}</span
							>
							<select
								disabled={isChangedCount}
								on:change={(e) => {
									const value = parseInt(e?.target?.value);
									if (
										value !== RoomCount.FIVE &&
										value !== RoomCount.TEN &&
										value !== RoomCount.FIFTEEN
									) {
										return;
									}
									if (value !== count) {
										if (value < count) {
											toast.error($t('common.errorLimitUser'));
											return;
										}
										isChangedCount = true;
										socket.emit(ListenChannel.SET_ROOM_CAPACITY, {
											roomId: room.room.id,
											count: value
										});
									}
								}}
								class={`rounded-lg px-2 py-3 bg-gray-50 text-gray-700 text-base focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary border-0 ${
									isChangedCount ? 'cursor-not-allowed opacity-50' : ''
								}`}
							>
								<option value={0} selected disabled>{count}</option>
								<option value={RoomCount.FIVE}>5</option>
								<option value={RoomCount.TEN}>10</option>
								<option value={RoomCount.FIFTEEN}>15</option>
							</select>
						</div>
					{/if}
				</div>
				<div class="flex flex-row-reverse justify-start items-center gap-1 h-12">
					<button
						disabled={isChangedVisibility}
						class={`p-2 bg-slate-50/30 shadow-xl rounded-lg h-full ${
							isChangedVisibility ? 'cursor-wait opacity-50' : ''
						}`}
						on:click={changeRoomVisibility}
					>
						<Icon
							icon={isPublic ? 'zondicons:lock-open' : 'zondicons:lock-closed'}
							class={`text-3xl  ${isPublic ? 'text-green-500' : 'text-red-500'}`}
						/>
					</button>

					<p
						class="tracking-widest bg-purple-300/30 p-2 text-purple-400 font-bold shadow-xl rounded-lg w-full h-full text-2xl flex items-center justify-between gap-2 {isPublic
							? 'hidden'
							: 'block'}"
					>
						<span>{valuePassword}</span>
						<button
							class="border p-1 rounded-md shadow-xl bg-white/30"
							on:click={handleCopyPassword}
						>
							<Icon icon={'solar:copy-broken'} class="text-white" />
						</button>
					</p>
				</div>
			</div>
		</div>
	</div>
{/if}
