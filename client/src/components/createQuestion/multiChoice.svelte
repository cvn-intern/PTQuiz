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
	class=" grid 2xl:grid-cols-2 2xl:gap-3 2xl:h-1/2 2xl:w-full xl:grid-cols-2 xl:gap-3 xl:h-1/2 xl:w-full lg:grid-cols-2 lg:gap-2 lg:h-1/2 lg:w-full md:grid-cols-2 md:gap-3 md:h-1/2 md:w-full grid-cols-1 gap-3 h-1/2 w-full"
>
	<Option
		question="A"
		optionOfQuestion="bg-optionA"
		isSingleChoice={false}
		{index}
		answerValue={test.answerA}
	/>
	<Option
		question="B"
		optionOfQuestion="bg-optionB"
		isSingleChoice={false}
		{index}
		answerValue={test.answerB}
	/>
	<Option
		question="C"
		optionOfQuestion="bg-optionC"
		isSingleChoice={false}
		{index}
		answerValue={test.answerC}
	/>
	<Option
		question="D"
		optionOfQuestion="bg-optionD"
		isSingleChoice={false}
		{index}
		answerValue={test.answerD}
	/>
</div>
