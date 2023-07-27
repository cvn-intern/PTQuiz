<script lang="ts">
	import SingleChoice from './singleChoice.svelte';
	import InputQuestion from './inputQuestion.svelte';
	import MultipleChoice from './multiChoice.svelte';
	import Truefalse from './truefalse.svelte';
	import EssayChoice from './essayChoice.svelte';
	import MultiChoice from './multiChoice.svelte';
	export let typeOfQuestion = 0;
	export let index: number;
</script>

<div class="flex flex-col w-full h-full p-6 bg-primary rounded-lg">
	<div class="h-full flex flex-col w-full">
		<InputQuestion {index} />
		{#if typeOfQuestion === 0}
			<MultiChoice {index} />
		{:else if typeOfQuestion === 1}
			<SingleChoice {index} />
		{:else if typeOfQuestion === 2}
			<EssayChoice {index} />
		{:else if typeOfQuestion === 3}
			<Truefalse {index} />
		{/if}
	</div>
</div>
