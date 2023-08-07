<script lang="ts">
	import { TypeQuestion } from '$constants/typeQuestion';
	import { t } from '$i18n/translations';
	import Icon from '@iconify/svelte';
	import { Button, Tooltip } from 'flowbite-svelte';

	export let quizzesType: number;
	export let quizzesPointer: number;
	export let quizzesNumber: number;
	export let quizzesHint: string | null;
	export let isHost: boolean;
	export let isBattle: boolean;
	export let isSingle: boolean;
	export let isShowChat: boolean;
	import { onDestroy, onMount } from 'svelte';

	let modalIsOpen = false;
	let screenWidth: number;

	const handleModal = () => {
		modalIsOpen = !modalIsOpen;
	};

	const closeModal = () => {
		modalIsOpen = false;
	};

	const openModal = () => {
		modalIsOpen = true;
	};

	onMount(() => {
		if (screenWidth >= 768) {
			openModal();
		}
	});

	const closeModalOnEscapeKey = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeModal();
		}
	};

	const handleClickOpenChat = () => {
		isShowChat = !isShowChat;
	};
</script>

<svelte:window bind:innerWidth={screenWidth} />

<button class={`absolute ${isBattle ? 'top-20' : 'top-10'} right-2 z-50`} on:click={handleModal}>
	<Icon icon="material-symbols:settings-outline" class="w-10 h-10" />
</button>

{#if modalIsOpen}
	<button
		id="modal"
		class={`modal absolute ${isBattle ? 'top-20' : 'top-10'} right-2 mt-12 z-50`}
		on:keydown={closeModalOnEscapeKey}
	>
		<div class="bg-primary rounded-xl p-2 shadow-lg relative group flex flex-col">
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
					{:else if quizzesType === TypeQuestion.ARRANGE_WORD}
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
							{$t('common.arrangeWord')}
						</div>
					{:else if quizzesType === TypeQuestion.INPUT_TEXT}
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
							{$t('common.inputText')}
						</div>
					{/if}
				</div>

				{#if isHost || isBattle}
					<hr class="w-full" />
					<button
						on:click={handleClickOpenChat}
						class="shadow-lg shadow-darkGreen/30 rounded-full backdrop-opacity-10 backdrop-invert bg-orangeLogo text-white border-2 border-gray-300 font-semibold p-2
			"
					>
						<Icon icon="et:chat" class="text-3xl w-10 h-10" />
					</button>
				{/if}

				{#if !isBattle && (isHost || isSingle)}
					{#if quizzesHint && quizzesHint !== ''}
						<hr class="w-full" />
						<Button id="hint">
							<Icon
								icon="heroicons-outline:light-bulb"
								class="w-16 h-16 text-yellow-400"
							/>
						</Button>
						<Tooltip triggeredBy="#hint" placement="left" class="text-xl"
							>{quizzesHint}</Tooltip
						>
					{/if}
				{/if}
			</div>
		</div>
	</button>
{/if}
