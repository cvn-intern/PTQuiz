<script lang="ts">
	import { t } from '$i18n/translations';
	import { questionData } from '$stores/questionInfoStore';
	export let question = '';
	export let optionOfQuestion = '';
	export let isSingleChoice = false;
	export let index: number;
	export let isTrueFalse = false;
	let content: string;
	let answerValue = false;
	$: questionData.subscribe((data) => {
		if (question === 'A') content = data[index].options.optionA;
		if (question === 'B') content = data[index].options.optionB;
		if (question === 'C') content = data[index].options.optionC;
		if (question === 'D') content = data[index].options.optionD;
	});
	$: questionData.update((data) => {
		if (question === 'A') data[index].options.optionA = content;
		if (question === 'B') data[index].options.optionB = content;
		if (question === 'C') data[index].options.optionC = content;
		if (question === 'D') data[index].options.optionD = content;
		return data;
	});

	$: questionData.update((data) => {
		if (data[index] !== 1) {
			data[index].answers = {
				answerA: false,
				answerB: false,
				answerC: false,
				answerD: false
			};
		}
		return data;
	});

	function handleRadioChange(event) {
		answerValue = event.target.checked;
		const updatedQuestionData = questionData.update((data) => {
			data[index].answers = {
				answerA: false,
				answerB: false,
				answerC: false,
				answerD: false
			};
			if (question === 'A') data[index].answers.answerA = true;
			else if (question === 'B') data[index].answers.answerB = true;
			else if (question === 'C') data[index].answers.answerC = true;
			else if (question === 'D') data[index].answers.answerD = true;

			return data;
		});
	}
	function handleCheckBoxChange(event) {
		answerValue = event.target.checked;
		const updatedQuestionData = questionData.update((data) => {
			if (question === 'A') data[index].answers.answerA = !data[index].answers.answerA;
			else if (question === 'B') data[index].answers.answerB = !data[index].answers.answerB;
			else if (question === 'C') data[index].answers.answerC = !data[index].answers.answerC;
			else if (question === 'D') data[index].answers.answerD = !data[index].answers.answerD;
			return data;
		});
	}
</script>

<div class="{optionOfQuestion} rounded-xl flex flex-row items-center">
	<h1
		class="{isTrueFalse
			? 'w-3/4 text-center'
			: ''} 2xl:mx-8 2xl:text-4xl 2xl:font-semibold xl:mx-6 xl:text-3xl xl:font-semibold lg:mx-5 lg:text-2xl lg:font-semibold md:mx-4 md:text-3xl md:font-semibold mx-4 text-xl font-semibold"
	>
		{question}
	</h1>
	{#if !isTrueFalse}
		<input
			bind:value={content}
			type="text"
			placeholder={$t('common.typeYourAnswer')}
			class="2xl:h-full 2xl:w-2/3 2xl:text-3xl xl:h-full xl:w-2/3 xl:text-2xl lg:h-full lg:w-2/3 lg:text-xl md:h-full md:w-2/3 md:text-4xl sm:placeholder:text-xl placeholder:text-xs h-full w-3/4 text-xl placeholder-slate-200 text-center resize-none {optionOfQuestion} border-none border-transparent focus:border-transparent focus:ring-0"
		/>
	{/if}
	<input
		type={isSingleChoice ? 'radio' : 'checkbox'}
		name="trueAnswer"
		id=""
		class="2xl:p-5 2xl:ml-5 xl:p-3 xl:ml-2 lg:p-3 lg:ml-2 md:p-4 md:ml-1 p-2 cursor-pointer {isSingleChoice
			? ''
			: 'rounded-lg shadow-lg'}"
		checked={answerValue}
		on:change={isSingleChoice ? handleRadioChange : handleCheckBoxChange}
	/>
</div>
