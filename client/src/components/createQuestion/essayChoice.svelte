<script lang="ts">
	import { t } from '$i18n/translations';
	import { questionData } from '$stores/questionInfoStore';
	export let index: number;
	let essay: string;
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
</script>

<div class=" grid xl:gap-3 lg:gap-2 md:gap-3 grid-cols-1 gap-3 h-1/3 w-full">
	<div class=" bg-optionB rounded-xl flex flex-row items-center justify-center">
		<input
			bind:value={essay}
			type="text"
			maxlength="6"
			placeholder={$t('common.typeYourAnswer')}
			class=" 2xl:text-3xl xl:text-2xl lg:text-xl md:h-full md:w-2/3 md:text-4xl sm:placeholder:text-xl placeholder:text-xs h-full w-3/4 text-xl placeholder-slate-200 text-center resize-none bg-optionB border-none border-transparent focus:border-transparent focus:ring-0"
		/>
	</div>
</div>
