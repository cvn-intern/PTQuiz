<script lang="ts">
	import Icon from '@iconify/svelte';

	export let option: {
		id: string;
		color: string;
		contents: string;
		isCorrect: boolean;
		disabled: boolean;
	};

	export let index: number;
	export let isAnswerChecked: boolean;
	export let selectedAnswerIndex: number;
	export let pickAnswer: (id: string, index: number) => void;
</script>

<button
	on:click={() => pickAnswer(option.id, index)}
	class={`rounded-2xl flex p-2 md:p-4 gap-2 items-center text-gray-900 shadow-xl min-h-full ${
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
	<div class="rounded-full">
		<Icon icon={`twemoji:letter-${option.id.toLowerCase()}`} class={`md:text-4xl text-2xl`} />
	</div>
	<p class="text-sm md:text-xl font-semibold text-left">{option.contents}</p>
</button>
