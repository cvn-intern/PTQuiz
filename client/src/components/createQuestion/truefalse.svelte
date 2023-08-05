<script lang="ts">
	import { t } from '$i18n/translations';
	import { questionData, type AnswerType } from '$stores/questionInfoStore';
	import Option from './option.svelte';
	export let index: number;
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
		question={$t('common.trueAnswer')}
		optionOfQuestion="bg-optionB"
		isSingleChoice={true}
		isTrueFalse={true}
		{index}
		answerValue={test.answerA}
	/>
	<Option
		question={$t('common.falseAnswer')}
		optionOfQuestion="bg-optionA"
		isSingleChoice={true}
		isTrueFalse={true}
		{index}
		answerValue={test.answerB}
	/>
</div>
