<script lang="ts">
	import { Modal } from 'flowbite-svelte';

	export let option: {
		id: string;
		contents: string;
		isCorrect: boolean;
		disabled: boolean;
	};

	export let index: number;
	export let isAnswerChecked: boolean;
	export let selectedAnswerIndex: number;
	export let pickAnswer: (index: number) => void;
	export let isTrueFalse: boolean;

	export let showModal = true;

	function handleAnswerSelection() {
		if (isAnswerChecked || option.disabled) return;

		showModal = true;
		pickAnswer(index);

		setTimeout(() => {
			showModal = false;
		}, 2000);
	}
</script>

<button
	on:click={handleAnswerSelection}
	class={`rounded-xl flex p-2 md:p-4 gap-2 ${
		isTrueFalse ? 'justify-center' : ''
	} items-center text-gray-900 shadow-xl ${
		isAnswerChecked
			? option.isCorrect
				? 'bg-green-500'
				: selectedAnswerIndex === index
				? 'bg-red-500'
				: 'bg-gray-200'
			: 'bg-white'
	}`}
	disabled={option.disabled}
>
	{#if !isTrueFalse}
		<p class="text-lg md:text-2xl font-semibold text-left">{option.contents}</p>
	{:else}
		<p class="text-7xl font-semibold flex justify-center">{option.contents}</p>
	{/if}

	{#if showModal}
		<Modal bind:open={showModal} autoclose placement="top-center">
			<div class="">
				{#if option.isCorrect && selectedAnswerIndex != -1}
					<svg
						aria-hidden="true"
						class="mx-auto mb-4 w-14 h-14 text-green-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						Correct Answer!
					</h3>
				{:else}
					<svg
						aria-hidden="true"
						class="mx-auto mb-4 w-14 h-14 text-red-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
					<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						Wrong Answer! Try Better Next Time.
					</h3>
				{/if}
			</div>
		</Modal>
	{/if}
</button>
