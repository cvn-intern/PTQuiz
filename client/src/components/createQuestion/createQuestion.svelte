<script>
	import SingleChoice from './singleChoice.svelte';
	import InputQuestion from './inputQuestion.svelte';
	import MultipleChoice from './multiChoice.svelte';
	import Truefalse from './truefalse.svelte';
	import EssayChoice from './essayChoice.svelte';
	import MultiChoice from './multiChoice.svelte';

	export let typeOfQuestion = 0;
</script>

<div class="flex flex-col w-full h-full p-6 bg-primary rounded-lg">
	<div class="h-full flex flex-col w-full ">
		<InputQuestion />
		{#if typeOfQuestion===0}
		<MultiChoice />
		{:else if typeOfQuestion===1}
		<SingleChoice />
		{:else if typeOfQuestion===2}
		<EssayChoice />
		{:else if typeOfQuestion===3}
		<Truefalse />
		{/if}
	</div>
</div>
