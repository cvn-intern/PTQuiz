<script>
	import SingleChoice from './singleChoice.svelte';
	import InputQuestion from './inputQuestion.svelte';
	import MultipleChoice from './multiChoice.svelte';
	import Truefalse from './truefalse.svelte';
	import EssayChoice from './essayChoice.svelte';
	import MultiChoice from './multiChoice.svelte';
</script>

<div class="flex flex-row h-[800px] w-full">
	<div class="h-full lg:w-3/4 flex flex-col lg:p-6 w-full p-6">
		<InputQuestion />
		<SingleChoice />
	</div>
</div>
