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
			<p class="text-xl md:text-3xl text-left">{option.contents}</p>
		</button>
	{/each}
	{#if showModal}
		<Modal bind:open={showModal} autoclose placement="top-center">
			<div class="flex justify-center items-center py-4">
				{#if handleShowMultipleModal(fourOptions, multipleChoiceAnswer)}
					<Icon icon="flat-color-icons:ok" class="text-9xl" />
				{:else}
					<Icon icon="teenyicons:x-circle-solid" class="text-9xl text-red-500" />
				{/if}
			</div>
		</Modal>
	{/if}
</div>
