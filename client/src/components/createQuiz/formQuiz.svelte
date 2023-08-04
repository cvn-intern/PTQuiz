<script lang="ts">
	import { t } from '$i18n/translations';
	import { Button, Label, Select } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	import type { FieldForm, InputForm, selectOptionne } from './interface/createQuiz.interface';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	export let form: any;
	export let result: any;
	export let action: string;
	export let isUpdate: boolean;

	let sharedToastId: string | number;

	const showLoadingToast = (): void => {
		sharedToastId = toast.loading(t.get('common.loading'), { duration: 20000 });
	};

	const dismissLoadingToast = (): void => {
		toast.dismiss(sharedToastId.toString());
	};

	let isSubmitting: boolean = false;
	$: getMessageError = (name: string): string => {
		return form?.message?.error?.message?.[name] ?? '';
	};
	$: if (form?.message?.isDone || form?.isDone) {
		dismissLoadingToast();
		if (form?.error?.message) {
			toast.error(form?.error?.message);
		}
		isSubmitting = false;
	}
	$: if (form?.isSuccess && !isUpdate) {
		dismissLoadingToast();
		toast.success(t.get('common.success'));
		goto(`/createQuiz/${form?.success?.id}`);
	}

	let levelList: selectOptionne[] = [
		{ value: 0, name: 'Easy' },
		{ value: 1, name: 'Medium' },
		{ value: 2, name: 'Hard' }
	];

	let formData: FieldForm = {
		title: '',
		difficultyLevel: '',
		passingPoint: '',
		point: '',
		description: ''
	};

	export const snapshot = {
		capture: () => formData,
		restore: (value: FieldForm) => (formData = value)
	};

	const inputFormList: InputForm[] = [
		{
			label: `${$t('common.title')}`,
			name: 'title',
			type: 'text',
			required: true
		},
		{
			label: `${$t('common.level')}`,
			name: 'difficultyLevel',
			type: 'select',
			selectOptionsList: levelList,
			required: true
		},
		{
			label: `${$t('common.passingPoint')}`,
			name: 'passingPoint',
			type: 'number',
			required: true
		},

		{
			label: `${$t('common.totalPoints')}`,
			name: 'point',
			type: 'number',
			required: true
		},
		{
			label: `${$t('common.file')}`,
			name: 'image',
			type: 'file',
			required: false
		},
		{
			label: `${$t('common.description')}`,
			name: 'description',
			type: 'textarea',
			required: false
		}
	];
	$: hiddenInputFile = isUpdate;
</script>

<form
	class="my-6 flex flex-col space-y-4 items-center rounded-lg dark:bg-gray-800 dark:text-white dark:shadow-none dark:border-gray-600 dark:border-2 w-full"
	{action}
	method="post"
	use:enhance={() => {
		return async ({ update }) => {
			await update({ reset: false });
		};
	}}
	on:submit={() => {
		isSubmitting = true;
		showLoadingToast();
	}}
	enctype="multipart/form-data"
>
	<h3 class="text-xl font-medium text-gray-900 dark:text-white">
		{$t('common.informationQuiz')}
	</h3>
	<div class="grid md:grid-cols-2 gap-4 grid-cols-1 w-full">
		{#each inputFormList as { label, name, type, required, selectOptionsList }}
			<div class="w-full">
				<Label class="space-y-2 block text-base font-medium text-gray-900 dark:text-w">
					{label} <span class="text-red-600">{required ? '*' : ''}</span>
				</Label>
				{#if type === 'file'}
					<div>
						<input
							type="file"
							name="image"
							accept="image/*"
							class="text-base {hiddenInputFile ? 'hidden' : ''}"
						/>
						{#if result[name] !== ''}
							<div class="relative">
								<img
									src={result[name]}
									alt="thumbnail"
									class="w-full h-32 cursor-pointer {hiddenInputFile
										? ''
										: 'hidden'}"
								/>
								<button
									type="button"
									class="absolute top-0 left-0 w-full h-full bg-transparent bg-opacity-10 flex justify-center items-center cursor-pointer {hiddenInputFile
										? ''
										: 'hidden'}"
									on:click={() => {
										hiddenInputFile = !hiddenInputFile;
									}}
								>
									<Icon
										icon={'typcn:edit'}
										class={'text-4xl bg-gray-50 hover:bg-neutral-200 hover:text-white p-2 rounded-full'}
									/>
								</button>
							</div>
						{/if}
					</div>
					{#if getMessageError('image') == ''}
						<p
							class="mt-1 text-base text-gray-500 dark:text-gray-300"
							id="file_input_help"
						>
							JPEG, PNG, JPG (5MB).
						</p>
					{/if}
				{:else if type === 'select'}
					<Select
						items={selectOptionsList}
						bind:value={result[name]}
						{required}
						id={name}
						{name}
						class="bg-gray-50 border border-graydish text-gray-700 text-base rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
					/>
				{:else if type === 'textarea'}
					<textarea
						maxlength="100"
						id={name}
						placeholder={label}
						{name}
						class="bg-gray-50 border border-graydish text-gray-900 text-base rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					/>
				{:else if type === 'number'}
					<input
						bind:value={result[name]}
						minlength="10"
						maxlength="50"
						id={name}
						type="number"
						placeholder={label}
						{name}
						class="bg-gray-50 border border-graydish text-gray-900 text-base rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					/>
				{:else}
					<input
						minlength="1"
						maxlength="50"
						id={name}
						type="text"
						placeholder={label}
						{name}
						{required}
						bind:value={result[name]}
						class="bg-gray-50 border border-graydish text-gray-900 text-base rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					/>
				{/if}
				<div>
					<p class="mt-1 text-base text-red-500 dark:text-gray-300">
						{getMessageError(name)}
					</p>
				</div>
			</div>
		{/each}
	</div>

	<Button
		type="submit"
		disabled={isSubmitting}
		class="w-full text-white bg-secondary hover:bg-darkGreen focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-base px-5 py-2.5 text-center ${isSubmitting
			? 'opacity-50 cursor-wait'
			: ''} ">{$t('common.save')}</Button
	>
</form>
