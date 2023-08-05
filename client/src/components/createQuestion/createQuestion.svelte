<script lang="ts">
	import SingleChoice from './singleChoice.svelte';
	import InputQuestion from './inputQuestion.svelte';
	import MultipleChoice from './multiChoice.svelte';
	import Truefalse from './truefalse.svelte';
	import EssayChoice from './essayChoice.svelte';
	import MultiChoice from './multiChoice.svelte';
	import ArrangeWord from './arrangeWord.svelte';
	import InputText from './inputText.svelte';
	import GifSingleChoice from './gifSingleChoice.svelte';
	export let typeOfQuestion = 0;
	export let index: number;
</script>

<div class="flex flex-col w-full h-full p-6 bg-primary rounded-lg gap-6">
	<InputQuestion {index} />
	{#if typeOfQuestion === 0}
		<MultiChoice {index} />
	{:else if typeOfQuestion === 1}
		<SingleChoice {index} />
	{:else if typeOfQuestion === 2}
		<EssayChoice {index} />
	{:else if typeOfQuestion === 3}
		<Truefalse {index} />
	{:else if typeOfQuestion === 4}
		<ArrangeWord {index} />
	{:else if typeOfQuestion === 5}
		<InputText {index} />
	{:else}
		<GifSingleChoice {index} />
	{/if}
</div>
