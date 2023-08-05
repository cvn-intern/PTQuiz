<script lang="ts">
	import { t } from '$i18n/translations';
	import { isSubmitStore } from '$stores/isSubmitStore';
	import { questionData } from '$stores/questionInfoStore';
	import Editor from 'cl-editor/src/Editor.svelte';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	export let index: number;
	let title: string;
	let imageFile;
	let inputFocused = false;
	let imageUrl: string;
	let typeOfquestion: number;
	let hint: string;

	$: questionData.subscribe((data: any) => {
		if (index >= 0 && index < data.length) {
			title = data[index].title;
			imageUrl = data[index].image;
			typeOfquestion = data[index].type;
			hint = data[index].hint;
		}
	});

	$: questionData.update((data: any) => {
		if (index >= 0 && index < data.length) {
			data[index].title = title;
			data[index].image = imageUrl;
			data[index].hint = hint;
		}
		if (data[index].type === 4) {
			data[index].title = $t('common.titleOfArrangeWord');
			title = $t('common.titleOfArrangeWord');
		}
		return data;
	});

	const handleFileChange = (event: any) => {
		imageFile = event.target.files[0];
		imageUrl = URL.createObjectURL(imageFile);
		inputFocused = true;
	};

	const handleDeleteImage = () => {
		imageFile = '';
		imageUrl = '';
		questionData.update((data: any) => {
			if (index >= 0 && index < data.length) {
				data[index].image = '';
			}
			return data;
		});
	};
	let isSubmit: boolean;
	$: isSubmitStore.subscribe((data) => {
		isSubmit = data;
	});
</script>

<div class="gap-3 w-full flex md:flex-row flex-col items-center">
	<div class="flex items-center justify-center lg:w-1/3 md:w-1/2 w-full">
		<label
			for="dropzone-file"
			class=" w-full flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 md:h-heightImage h-heightImageMobile {imageUrl ===
				'' &&
			isSubmit &&
			typeOfquestion === 6
				? 'border-red-600'
				: ''}"
		>
			{#if imageUrl}
				<div class="group hover:opacity-100 w-full flex">
					<div class="w-full flex items-center">
						<img class="w-full object-fit md:h-heightImage h-heightImageMobile" src={imageUrl} alt="Question" />
					</div>
					<div class="relative">
						<button
							on:click={handleDeleteImage}
							class="absolute top-0 right-0 bg-red-600 text-white opacity-0 group-hover:opacity-100 px-2 py-1 rounded"
							>Delete</button
						>
					</div>
				</div>
			{:else}
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
						<span
							class="xl:font-semibold lg:font-semibold md:font-semibold font-semibold"
							>{typeOfquestion === 6
								? $t('common.uploadGif')
								: $t('common.uploadImage')}</span
						>
					</p>
					<p
						class="2xl:text-xs xl:text-xs lg:text-[10px] md:text-xl text-xs text-gray-500 dark:text-gray-400 {typeOfquestion ===
						6
							? 'text-red-600'
							: ''}"
					>
						{typeOfquestion === 6 ? $t('common.requireGift') : $t('common.PNGorJPG')}
					</p>
				</div>
			{/if}
			<input
				id="dropzone-file"
				name="image"
				type="file"
				class="hidden"
				accept="image/*"
				on:change={handleFileChange}
			/>
		</label>
	</div>
	<div class="flex w-full gap-3 md:flex-row flex-col">
		<textarea
			class=" placeholder-slate-200 2xl:text-3xl xl:text-2xl lg:text-xl md:w-2/3 md:text-xl w-full text-xl border border-gray-300 rounded-xl text-center md:p-10 resize-none {isSubmit &&
			title === ''
				? 'border-red-600 border-2'
				: ''}"
			placeholder={$t('common.typeYourQuestionHere')}
			rows="5"
			bind:value={title}
			maxlength="100"
			disabled={typeOfquestion === 4}
		/>
		<textarea
			class=" placeholder-slate-200 2xl:text-3xl xl:text-2xl lg:text-xl md:w-1/3 md:text-xl w-full text-xl border border-gray-300 rounded-xl text-center md:p-10 resize-none"
			placeholder={$t('common.hint')}
			rows="5"
			bind:value={hint}
			maxlength="50"
		/>
	</div>
</div>
