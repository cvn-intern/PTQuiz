<script lang="ts">
	import { TypeQuestion } from '$constants/typeQuestion';
	import { t } from '$i18n/translations';
	import clsx from 'clsx';
	import InformationModal from './informationModal.svelte';
	import ImageModal from './imageModal.svelte';

	export let quizzesType: number;
	export let quizzesTitle: string;
	export let quizzesNumber: number;
	export let quizzesPointer: number;
	export let quizzesImage: string | null;
	export let isShowOption: boolean = true;

	let modalOpen: boolean = false;

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
	$: isShowGif = false;

	async function showGif() {
		const duration = await getDuration(quizzesImage);
		isShowGif = true;
		setTimeout(() => {
			const gif = document.getElementById('gif');
			if (gif) {
				viewCount--;
				isShowGif = false;
			}
		}, duration);
	}

	function startGame() {
		isShowOption = true;
	}
</script>

<div class="flex flex-col h-full w-full">
	<div
		class={`${
			quizzesImage ? 'h-1/2' : 'h-full'
		} flex flex-col w-full overflow-y-hidden relative`}
	>
		<InformationModal {quizzesType} {quizzesPointer} {quizzesNumber} />
		<div class="flex justify-center items-center px-4 flex-1">
			{#if isShowOption}
				<p
					class="p-2 text-3xl md:text-5xl lg:text-7xl font-semibold text-black text-center"
				>
					{quizzesTitle}
				</p>
			{:else}
				<div class="flex flex-col justify-between gap-3 items-center">
					<p
						class="p-2 text-3xl md:text-5xl lg:text-7xl font-semibold text-black text-center"
					>
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
								hidden: isShowGif
							}
						)}
						on:click={startGame}
					>
						Start game!
					</button>

					{#if isShowGif}
						<div class="h-1/2 w-full order-2 md:h-full md:w-2/3 md:order-1">
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
	</div>
	{#if quizzesImage && quizzesType !== TypeQuestion.GIF_SINGLE_CHOICE}
		<button
			class="h-1/2 w-full flex justify-center items-center"
			on:click={() => {
				modalOpen = true;
			}}
		>
			<img src={quizzesImage} alt="quizzesImage" class="max-h-full rounded-xl shadow-xl" />
		</button>
		<ImageModal bind:modalOpen imageSrc={quizzesImage} />
	{/if}
</div>
