<script lang="ts">
	import { TypeQuestion } from '$constants/typeQuestion';
	import { t } from '$i18n/translations';
	import clsx from 'clsx';

	export let quizzesType: number;
	export let quizzesTitle: string;
	export let quizzesNumber: number;
	export let quizzesPointer: number;
	export let quizzesImage: string | null;
	export let isShowOption: boolean;

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

<div class="flex flex-col md:flex-row h-full w-full md:justify-center">
	{#if quizzesImage && quizzesType !== TypeQuestion.GIF_SINGLE_CHOICE}
		<div class="h-1/2 w-full order-2 md:h-full md:w-2/3 md:order-1">
			<img src={quizzesImage} alt="quizzesImage" class="h-full w-full rounded-xl shadow-xl" />
		</div>
	{/if}
	<div class="order-1 h-1/2 flex flex-col w-full md:h-full md:order-2">
		<div class="flex justify-end gap-4">
			<div
				class="w-16 md:w-28 h-full shadow-xl rounded-xl bg-primary flex justify-center items-center text-xl md:text-4xl"
			>
				{quizzesPointer + 1}/{quizzesNumber}
			</div>
			<div class="flex">
				{#if quizzesType === TypeQuestion.GIF_SINGLE_CHOICE}
					<div
						class="hidden md:grid grid-cols-2 grid-rows-2 gap-2 bg-primary p-3 rounded-xl md:items-center"
					>
						<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
					</div>
					<div class=" md:hidden rounded-xl text-black shadow-xl p-2 bg-primary">
						{$t('common.singleChoice')}
					</div>
				{:else if quizzesType === TypeQuestion.SINGLE_CHOICE}
					<div
						class="hidden md:grid grid-cols-2 grid-rows-2 gap-2 bg-primary p-3 rounded-xl md:items-center"
					>
						<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
					</div>
					<div class=" md:hidden rounded-xl text-black shadow-xl p-2 bg-primary">
						{$t('common.singleChoice')}
					</div>
				{:else if quizzesType === TypeQuestion.MULTIPLE_CHOICE}
					<div
						class="hidden md:grid grid-cols-2 grid-rows-2 gap-2 bg-primary p-2 rounded-xl items-center"
					>
						<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
						<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
						<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
					</div>
					<div class=" md:hidden rounded-xl text-black shadow-xl p-2 bg-primary">
						{$t('common.multiChoice')}
					</div>
				{:else if quizzesType === TypeQuestion.TRUE_FALSE}
					<div
						class="hidden md:grid grid-cols-2 grid-rows-1 gap-2 bg-primary p-2 rounded-xl items-center"
					>
						<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
						<div class="w-12 h-10 rounded-lg bg-red-500" />
					</div>
					<div class=" md:hidden rounded-xl text-black shadow-xl p-2 bg-primary">
						{$t('common.trueFalse')}
					</div>
				{:else if quizzesType === TypeQuestion.GUESS_WORDS}
					<div class="md:flex hidden p-4 gap-2 bg-primary rounded-xl items-center">
						<div
							class="w-10 h-12 flex justify-center items-center border-b-2 border-black text-2xl animate-sequenceA"
						>
							A
						</div>
						<div
							class="w-10 h-12 flex justify-center items-center border-b-2 border-black text-2xl animate-sequenceB"
						>
							B
						</div>
						<div
							class="w-10 h-12 flex justify-center items-center border-b-2 border-black text-2xl animate-sequenceC"
						>
							C
						</div>
					</div>
					<div class="md:hidden rounded-xl text-black shadow-xl p-2 bg-primary">
						{$t('common.crossCharacter')}
					</div>
				{/if}
			</div>
		</div>
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
</div>
