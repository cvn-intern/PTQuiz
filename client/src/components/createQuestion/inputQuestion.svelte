<script lang="ts">
	import { t } from '$i18n/translations';
	import { questionData } from '$stores/questionInfoStore';
	export let index: number ;
	let title: string;
	$: questionData.subscribe((data) => {
		title = data[index].title;
	});
	$: questionData.update((data) => {
		data[index].title = title;
		return data;
	});

</script>

<div class="h-1/2 py-6 gap-3 w-full flex flex-row items-center">
	<div class="flex items-center justify-center lg:w-1/4 md:w-1/2 w-1/3 h-full">
		<label
			for="dropzone-file"
			class="2xl:w-full 2xl:h-full xl:w-full xl:h-full lg:w-full lg:h-full md:w-full md:h-full w-full h-full flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
		>
			<div
				class="2xl:pt-5 2xl:pb-6 xl:pt-2 xl:pb-6 lg:pt-1 lg:pb-1 md:pt-8 md:pb-8 pt-1 pb-2 flex flex-col items-center justify-center"
			>
				<svg
					class="2xl:w-8 2xl:h-8 xl:w-6 xl:h-6 lg:w-4 lg:h-4 md:w-16 md:h-16 w-8 h-8 text-gray-500 dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 16"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
					/>
				</svg>
				<p
					class="2xl:mb-2 2xl:text-sm xl:mb-1 xl:text-sm lg:mb-[5px] lg:text-xl md:mb-2 md:text-xl mb-2 text-[10px] text-gray-500 dark:text-gray-400"
				>
					<span class="xl:font-semibold lg:font-semibold md:font-semibold font-semibold"
						>{$t('common.uploadImage')}</span
					>
				</p>
				<p
					class="2xl:text-xs xl:text-xs lg:text-[10px] md:text-xl text-xs text-gray-500 dark:text-gray-400"
				>
					{$t('common.PNGorJPG')}
				</p>
			</div>
			<input id="dropzone-file" type="file" class="hidden" />
		</label>
	</div>
	<textarea
		class="h-full placeholder-slate-200 2xl:text-3xl xl:text-2xl lg:text-xl md:w-full md:text-xl w-3/4 text-xl border border-gray-300 rounded-xl text-center p-10 resize-none"
		placeholder={$t('common.typeYourQuestionHere')}
		rows="5"
		bind:value={title}
	/>
</div>
