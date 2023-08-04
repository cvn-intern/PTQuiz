<script lang="ts">
	import Icon from '@iconify/svelte';
	import ImageModal from '../singlePlay/imageModal.svelte';
	import toast from 'svelte-french-toast';
	import type { Socket } from 'socket.io-client';
	import { EmitChannel, ListenChannel } from '../../../libs/constants/socketChannel';
	import { onMount } from 'svelte';
	export let modalOpen: boolean;
	export let isHost: boolean;
	export let url: string;
	export let room: any;
	export let socket: Socket;
	let isCopied = false;
	let isChangedVisibility = false;
	let qrModalOpen = false;
	let isPublic = room.room.isPublic;
	$: size = modalOpen ? '500x500' : '100x100';
	const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&amp;size=${size}`;
	const handleCopy = () => {
		isCopied = true;
		setTimeout(() => {
			isCopied = false;
		}, 2000);
		navigator.clipboard.writeText(url);
		toast.success('Copied to clipboard');
	};
	let valuePassword = room.roomPassword;
	onMount(() => {
		socket.on(EmitChannel.ROOM_VISIBILITY, (data) => {
			isPublic = data.isPublic;
			isChangedVisibility = false;
		});
	});
	const handleCopyPassword = () => {
		navigator.clipboard.writeText(valuePassword);
		toast.success('Copied to clipboard');
	};
	const handleModal = () => {
		modalOpen = !modalOpen;
	};

	const closeModal = () => {
		modalOpen = !modalOpen;
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	};
	const changeRoomVisibility = () => {
		isChangedVisibility = true;
		socket.emit(ListenChannel.CHANGE_ROOM_VISIBILITY, {
			roomId: room.room.id,
			isPublic: !isPublic
		});
	};
</script>

<button class="absolute" on:click={handleModal}>
	<Icon icon="material-symbols:settings-outline" class="w-10 h-10" />
</button>

{#if modalOpen}
	<a
		class="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50"
		on:click={handleOutsideClick}
		type="button"
		href={'#'}
	>
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
				<ImageModal bind:modalOpen={qrModalOpen} imageSrc={qrCode} />
				<div class="flex flex-col items-center justify-between w-full gap-4">
					<div class="flex items-center justify-between w-full">
						<button
							disabled={isCopied}
							class={`p-2 bg-slate-50/30 shadow-xl rounded-sm cursor-not-allowed ${
								isCopied ? 'cursor-not-allowed opacity-50' : ''
							}`}
							on:click={handleCopy}
						>
							<Icon
								icon="icon-park-outline:copy-link"
								class="text-3xl text-sky-700"
							/>
						</button>
						<button
							disabled={isChangedVisibility}
							class={`p-2 bg-slate-50/30 shadow-xl rounded-sm  ${
								isChangedVisibility ? 'cursor-wait opacity-50' : ''
							}`}
							on:click={changeRoomVisibility}
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
	</a>
{/if}
