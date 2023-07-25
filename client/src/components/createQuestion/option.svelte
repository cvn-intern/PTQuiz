<script>
	import { t } from "$i18n/translations";

	export let question = '';
	export let optionOfQuestion = '';
	export let isSingleChoice = false;
	export let isTrueFalse = false;
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
			type="text"
			placeholder="{$t('common.typeYourAnswer')}"
			class="2xl:h-full 2xl:w-2/3 2xl:text-3xl xl:h-full xl:w-2/3 xl:text-2xl lg:h-full lg:w-2/3 lg:text-xl md:h-full md:w-2/3 md:text-4xl sm:placeholder:text-xl placeholder:text-xs h-full w-3/4 text-xl placeholder-slate-200 text-center resize-none {optionOfQuestion} border-none border-transparent focus:border-transparent focus:ring-0"
		/>
	{/if}
	<input
		type={isSingleChoice ? 'radio' : 'checkbox'}
		name="trueAnswer"
		id=""
		class="2xl:p-5 2xl:ml-5 xl:p-3 xl:ml-2 lg:p-3 lg:ml-2 md:p-4 md:ml-1 p-2 cursor-pointer {isSingleChoice
			? ''
			: 'rounded-full'}"
	/>
</div>
