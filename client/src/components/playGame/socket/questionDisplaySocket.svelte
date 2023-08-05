<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { EmitChannel, ListenChannel } from '$constants/socketChannel';
	import { TypeQuestion } from '$constants/typeQuestion';
	import { t } from '$i18n/translations';
	import clsx from 'clsx';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Tweened } from 'svelte/motion';
	import InformationModal from '../singlePlay/informationModal.svelte';
	import ImageModal from '../singlePlay/imageModal.svelte';

	export let socket: Socket;
	export let quizzesType: number;
	export let quizzesTitle: string;
	export let quizzesNumber: number;
	export let quizzesPointer: number;
	export let quizzesImage: string | null;
	export let quizzesHint: string | null;
	export let isHost: boolean = false;
	export let timer: Tweened<number>;
	export let questionTime: number;
	export let isShowOption: boolean;
	export let isBattle: boolean;

	let isShowGif: boolean;
	let modalOpen: boolean = false;
	let isGifButtonClicked: boolean = false;

	async function getDuration(url: any) {
		const res = await fetch(url);
		const ab = await res.arrayBuffer();
		const duration = await isGifAnimated(new Uint8Array(ab));
		return duration;
	}

	function isGifAnimated(uint8: any) {
		let duration = 0;
		for (let i = 0, len = uint8.length; i < len; i++) {
			if (
				uint8[i] == 0x21 &&
				uint8[i + 1] == 0xf9 &&
				uint8[i + 2] == 0x04 &&
				uint8[i + 7] == 0x00
			) {
				const delay = (uint8[i + 5] << 8) | (uint8[i + 4] & 0xff);
				duration += delay < 2 ? 10 : delay;
			}
		}
		return duration * 10;
	}

	$: viewCount = 2;
	$: duration = 0;

	if (quizzesType === TypeQuestion.GIF_SINGLE_CHOICE) {
		isShowOption = false;
	}

	async function showGif() {
		duration = await getDuration(quizzesImage);
		isShowGif = true;
		isGifButtonClicked = true;
		if (isHost) {
			await socket.emit(EmitChannel.GIF_QUESTION, {
				roomPIN: $page.params.slug,
				isShowGif: true,
				isShowOption: false,
				duration: duration
			});
		}
	}

	async function startGame() {
		if (isHost) {
			await socket.emit(EmitChannel.GIF_QUESTION, {
				roomPIN: $page.params.slug,
				isShowGif: false,
				isShowOption: true,
				duration: duration
			});
		}
	}

	async function closeGif() {
		const gif = document.getElementById('gif');
		if (gif) {
			viewCount--;
			isShowGif = false;
		}
	}

	onMount(async () => {
		if (quizzesType === TypeQuestion.GIF_SINGLE_CHOICE) {
			await socket.on(EmitChannel.GIF_QUESTION, (data) => {
				isShowGif = data.isShowGif;
				isShowOption = data.isShowOption;
				duration = data.duration;
			});
		}
	});

	$: if (isShowGif) {
		setTimeout(() => {
			closeGif();
		}, duration);
	}
</script>

<InformationModal
	{quizzesType}
	{quizzesPointer}
	{quizzesNumber}
	{isHost}
	{isBattle}
	{quizzesHint}
	isSingle={false}
/>
<div class={`flex justify-center px-4 flex-1 ${quizzesImage ? 'h-1/2' : 'h-full'}`}>
	{#if isShowOption}
		<p class="p-4 text-3xl md:text-5xl lg:text-7xl font-semibold text-black text-left">
			{quizzesTitle}
		</p>
	{:else}
		<div class="flex flex-col justify-between gap-3 items-center">
			<p class="p-2 text-3xl md:text-5xl lg:text-7xl font-semibold text-black text-center">
				Hãy xem hình và đoán
			</p>

			<button
				class={clsx(
					' text-white font-bold text-xl justify-center transition duration-200 ease-in-out transform px-4 py-4 w-48 border-b-4 border-zinc-500 hover:border-b-2 bg-blueLogo rounded-2xl hover:translate-y-px ',
					{
						hidden: isShowGif
					}
				)}
				on:click={() => {
					showGif();
				}}
			>
				Click here!
			</button>

			<button
				class={clsx(
					' text-white font-bold text-xl justify-center transition duration-200 ease-in-out transform px-4 py-4 w-48 border-b-4 border-zinc-500 hover:border-b-2 bg-blueLogo rounded-2xl hover:translate-y-px ',
					{
						hidden: isShowGif || !isGifButtonClicked
					}
				)}
				on:click={startGame}
			>
				Start game!
			</button>

			{#if isShowGif}
				<div class="h-1/2 w-full flex justify-center items-center">
					<img
						id="gif"
						src={quizzesImage}
						alt="quizzesImage"
						class="h-full w-full rounded-xl shadow-xl"
					/>
				</div>
			{/if}
		</div>
	{/if}
</div>
{#if quizzesImage && quizzesType !== TypeQuestion.GIF_SINGLE_CHOICE}
	<button
		class="h-1/2 w-full flex justify-center items-center"
		on:click={() => {
			const screenWidth = window.innerWidth;
			if (screenWidth >= 768) {
				modalOpen = true;
			}
		}}
	>
		<img src={quizzesImage} alt="quizzesImage" class="h-full w-auto rounded-xl shadow-xl" />
	</button>
	<ImageModal bind:modalOpen imageSrc={quizzesImage} />
{/if}
