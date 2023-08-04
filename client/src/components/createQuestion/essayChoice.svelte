<script lang="ts">
	import { t } from '$i18n/translations';
	import { isSubmitStore } from '$stores/isSubmitStore';
	import { questionData } from '$stores/questionInfoStore';
	export let index: number;
	let essay: string;
	let isSubmit: boolean;
	$: isSubmitStore.subscribe((data) => {
		isSubmit = data;
	});
	$: questionData.subscribe((data) => {
		if (index >= 0 && index < data.length) {
			essay = data[index].written;
		}
	});
	$: questionData.update((data) => {
		if (index >= 0 && index < data.length) {
			data[index].written = essay;
		}
		return data;
	});
	$: essay = essay.toUpperCase();
	$: essay = essay.replace(' ', '');
</script>

<div class=" grid xl:gap-3 lg:gap-2 md:gap-3 grid-cols-1 gap-3 h-1/3 w-full">
	<div
		class=" bg-optionB rounded-xl flex flex-row items-center justify-center {isSubmit &&
		essay === ''
			? 'border-red-600 border-2'
			: ''}"
	>
		<input
			bind:value={essay}
			type="text"
			maxlength="10"
			placeholder={$t('common.typeYourAnswer')}
			class=" 2xl:text-3xl xl:text-2xl lg:text-xl md:h-full md:w-2/3 md:text-4xl sm:placeholder:text-xl placeholder:text-xs h-full w-3/4 text-xl placeholder-slate-200 text-center resize-none bg-optionB border-none border-transparent focus:border-transparent focus:ring-0 {isSubmit &&
			essay === ''
				? 'border-red-600 border-2'
				: ''}"
		/>
	</div>
</div>
