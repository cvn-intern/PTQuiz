<script lang="ts">
	import Option from './option.svelte';
	export let index: number;
	import { questionData, type AnswerType } from '$stores/questionInfoStore';
	let test: AnswerType;
	$: questionData.subscribe((data) => {
		if (index >= 0 && index < data.length) {
			test = data[index].answers;
		}
	});
</script>

<div
	class="h-60 grid md:grid-cols-2 grid-cols-1 gap-3 w-full"
>
	<Option
		question="A"
		optionOfQuestion="bg-optionA"
		isSingleChoice={true}
		{index}
		answerValue={test.answerA}
	/>
	<Option
		question="B"
		optionOfQuestion="bg-optionB"
		isSingleChoice={true}
		{index}
		answerValue={test.answerB}
	/>
	<Option
		question="C"
		optionOfQuestion="bg-optionC"
		isSingleChoice={true}
		{index}
		answerValue={test.answerC}
	/>
	<Option
		question="D"
		optionOfQuestion="bg-optionD"
		isSingleChoice={true}
		{index}
		answerValue={test.answerD}
	/>
</div>
