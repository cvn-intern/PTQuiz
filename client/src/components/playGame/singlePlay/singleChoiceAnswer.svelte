<script lang="ts">
	import TrueFalseModal from '$components/trueFalseModal.svelte';

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
	export let isShowOption: boolean;
	export let isGif: boolean;

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


{#if isShowOption}
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
			<p class="text-xl md:text-3xl text-left">{option.contents}</p>
		{:else}
			<p class="text-5xl flex justify-center">{option.contents}</p>
		{/if}

		{#if showModal}
			<TrueFalseModal
				bind:open={showModal}
				isTrue={option.isCorrect && selectedAnswerIndex != -1}
			/>
		{/if}
	</button>
{/if}
