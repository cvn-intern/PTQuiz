<script>
	import SingleChoice from './singleChoice.svelte';
	import InputQuestion from './inputQuestion.svelte';
	import MultipleChoice from './multiChoice.svelte';
	import Truefalse from './truefalse.svelte';
	import EssayChoice from './essayChoice.svelte';
	import MultiChoice from './multiChoice.svelte';
</script>

<div class="flex flex-col w-full h-full p-6 bg-primary rounded-lg">
	<div class="h-full flex flex-col w-full ">
		<InputQuestion />
		<SingleChoice />
	</div>
</div>
