<script lang="ts">
	import { TypeQuestion } from '$constants/typeQuestion';
	import { t } from '$i18n/translations';

	export let quizzesType: number;
	export let quizzesTitle: string;
	export let quizzesNumber: number;
	export let quizzesPointer: number;
	export let quizzesImage: string | null;
</script>

<div class="flex flex-col md:flex-row h-full w-full md:justify-center">
	{#if quizzesImage}
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
				{#if quizzesType === TypeQuestion.SINGLE_CHOICE}
					<div
						class="hidden md:grid grid-cols-2 grid-rows-2 gap-2 bg-primary p-3 rounded-xl md:items-center"
					>
						<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
						<div class="w-12 h-10 rounded-lg animate-changeColorRed" />
						<div class="w-12 h-10 rounded-lg animate-changeColorRed" />
						<div class="w-12 h-10 rounded-lg animate-changeColorRed" />
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
						<div class="w-12 h-10 rounded-lg animate-changeColorRed" />
					</div>
					<div class=" md:hidden rounded-xl text-black shadow-xl p-2 bg-primary">
						{$t('common.multiChoice')}
					</div>
				{:else if quizzesType === TypeQuestion.TRUE_FALSE}
					<div
						class="hidden md:grid grid-cols-2 grid-rows-1 gap-2 bg-primary p-2 rounded-xl items-center"
					>
						<div class="w-12 h-10 rounded-lg animate-changeColorGreen" />
						<div class="w-12 h-10 rounded-lg animate-changeColorRed" />
					</div>
					<div class=" md:hidden rounded-xl text-black shadow-xl p-2 bg-primary">
						{$t('common.trueFalse')}
					</div>
				{:else if quizzesType === TypeQuestion.GUESS_WORDS}
					<div class="md:flex hidden p-4 gap-2 bg-primary rounded-xl items-center">
						<div
							class="w-10 h-12 flex justify-center items-center rounded-lg border shadow-lg bg-secondary text-2xl animate-sequenceA"
						>
							A
						</div>
						<div
							class="w-10 h-12 flex justify-center items-center rounded-lg border shadow-lg bg-secondary text-2xl animate-sequenceB"
						>
							B
						</div>
						<div
							class="w-10 h-12 flex justify-center items-center rounded-lg border shadow-lg bg-secondary text-2xl animate-sequenceC"
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
			<p class="p-2 text-3xl md:text-5xl lg:text-7xl font-semibold text-black text-center">
				{quizzesTitle}
			</p>
		</div>
	</div>
</div>
