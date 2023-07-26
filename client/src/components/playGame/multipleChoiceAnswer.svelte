<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Modal } from 'flowbite-svelte';

	export let fourOptions: any[];
	export let multipleChoiceAnswer: boolean[];
	export let isMultipleChecked: boolean;
	export let showModal: boolean = true;
	export let isAnswerChecked: boolean;

	$: {
		if (!isAnswerChecked) {
			isMultipleChecked = true;
			multipleChoiceAnswer = [false, false, false, false];
		}
	}
	function handleShowMultipleModal(fourOptions: any[], userAnswer: any[]) {
		let isCorrect = true;
		fourOptions.forEach((option, index) => {
			if (option.isCorrect !== userAnswer[index]) {
				isCorrect = false;
			}
		});
		return isCorrect;
	}
</script>

<div class="grid grid-cols-1 gird-rows-4 md:grid-cols-2 md:grid-rows-2 w-full gap-4 h-full">
	{#each fourOptions as option, index}
		<button
			class={`rounded-xl flex p-2 md:p-4 gap-2 items-center text-gray-900 shadow-xl  ${
				isMultipleChecked
					? multipleChoiceAnswer[index] === true
						? ' bg-blue-300'
						: 'bg-white'
					: option.isCorrect
					? 'bg-green-500'
					: 'bg-red-500'
			}`}
			on:click={() => {
				multipleChoiceAnswer[index] = !multipleChoiceAnswer[index];
			}}
		>
			<div class="rounded-full">
				<Icon
					icon={`twemoji:letter-${option.id.toLowerCase()}`}
					class={`md:text-4xl text-2xl`}
				/>
			</div>
			<p class="text-sm md:text-xl font-semibold text-left">{option.contents}</p>
		</button>
	{/each}
	{#if showModal}
		<Modal bind:open={showModal} autoclose placement="top-center">
			<div class="">
				{#if handleShowMultipleModal(fourOptions, multipleChoiceAnswer)}
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
</div>
