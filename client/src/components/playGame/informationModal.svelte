<script lang="ts">
	import { TypeQuestion } from '$constants/typeQuestion';
	import { t } from '$i18n/translations';
	import Icon from '@iconify/svelte';
	export let quizzesType: number;
	export let quizzesPointer: number;
	export let quizzesNumber: number;
	import { onMount } from 'svelte';
	let modalIsOpen = false;

	const closeModal = () => {
		modalIsOpen = false;
	};

	const openModal = () => {
		modalIsOpen = true;
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	};

	onMount(() => {
		const screenWidth = window.innerWidth;
		if (screenWidth >= 768) {
			openModal();
		}
	});
</script>

<button class="flex justify-end" on:click={openModal}>
	<Icon icon="teenyicons:double-caret-left-outline" class="w-12 h-12" />
</button>

{#if modalIsOpen}
	<button class="absolute right-0 z-50">
		<div class="bg-primary rounded-xl p-2 shadow-lg relative group">
			<button
				class="absolute left-0 top-14 md:top-20 z-40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 bg-white rounded-r-2xl shadow-xl border-black-2"
				on:click={() => {
					closeModal();
				}}
			>
				<Icon icon="system-uicons:chevron-right-double" class="w-12 h-12 " />
			</button>
			<div class="flex flex-col gap-2 items-center">
				<div
					class="w-16 md:w-24 h-full font-semibold rounded-xl flex justify-center items-center text-xl md:text-4xl"
				>
					{quizzesPointer + 1}/{quizzesNumber}
				</div>
				<hr class="w-full" />
				<div class="flex">
					{#if quizzesType === TypeQuestion.GIF_SINGLE_CHOICE}
						<div
							class="hidden md:grid grid-cols-2 grid-rows-2 gap-1 bg-primary p-2 rounded-xl md:items-center"
						>
							<div class="w-10 h-8 rounded-lg animate-changeColorGreen" />
							<div class="w-10 h-8 rounded-lg bg-red-500" />
							<div class="w-10 h-8 rounded-lg bg-red-500" />
							<div class="w-10 h-8 rounded-lg bg-red-500" />
						</div>
						<div class=" md:hidden text-black p-2 bg-primary">
							{$t('common.singleChoice')}
						</div>
					{:else if quizzesType === TypeQuestion.SINGLE_CHOICE}
						<div
							class="hidden md:grid grid-cols-2 grid-rows-2 gap-1 bg-primary p-2 rounded-xl md:items-center"
						>
							<div class="w-10 h-8 rounded-lg animate-changeColorGreen" />
							<div class="w-10 h-8 rounded-lg bg-red-500" />
							<div class="w-10 h-8 rounded-lg bg-red-500" />
							<div class="w-10 h-8 rounded-lg bg-red-500" />
						</div>
						<div class=" md:hidden text-black p-2 bg-primary">
							{$t('common.singleChoice')}
						</div>
					{:else if quizzesType === TypeQuestion.MULTIPLE_CHOICE}
						<div
							class="hidden md:grid grid-cols-2 grid-rows-2 gap-1 bg-primary p-2 rounded-xl items-center"
						>
							<div class="w-10 h-8 rounded-lg animate-changeColorGreen" />
							<div class="w-10 h-8 rounded-lg animate-changeColorGreen" />
							<div class="w-10 h-8 rounded-lg animate-changeColorGreen" />
							<div class="w-10 h-8 rounded-lg bg-red-500" />
						</div>
						<div class=" md:hidden text-black p-2 bg-primary">
							{$t('common.multiChoice')}
						</div>
					{:else if quizzesType === TypeQuestion.TRUE_FALSE}
						<div
							class="hidden md:grid grid-cols-2 grid-rows-1 gap-1 bg-primary p-2 rounded-xl items-center"
						>
							<div class="w-10 h-8 rounded-lg animate-changeColorGreen" />
							<div class="w-10 h-8 rounded-lg bg-red-500" />
						</div>
						<div class=" md:hidden text-black p-2 bg-primary">
							{$t('common.trueFalse')}
						</div>
					{:else if quizzesType === TypeQuestion.GUESS_WORDS}
						<div class="md:flex hidden p-4 gap-2 bg-primary rounded-xl items-center">
							<div
								class="w-8 h-10 flex justify-center items-center border-b-2 border-black text-2xl animate-sequenceA"
							>
								A
							</div>
							<div
								class="w-8 h-10 flex justify-center items-center border-b-2 border-black text-2xl animate-sequenceB"
							>
								B
							</div>
							<div
								class="w-8 h-10 flex justify-center items-center border-b-2 border-black text-2xl animate-sequenceC"
							>
								C
							</div>
						</div>
						<div class="md:hidden text-black p-2 bg-primary">
							{$t('common.crossCharacter')}
						</div>
					{/if}
				</div>
				<hr class="w-full" />
				<Icon
					icon="heroicons-outline:light-bulb"
					class="w-16 h-16 text-yellow-400"
					on:click={closeModal}
				/>
			</div>
		</div>
	</button>
{/if}
