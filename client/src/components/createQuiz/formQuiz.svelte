<script lang="ts">
	import { t } from '$i18n/translations';
	import { Button, Modal, Label, Input, Select, Textarea, P } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { FieldForm, InputForm, selectOptionne } from './interface/createQuiz.interface';
	import { showLoadingToast, dismissLoadingToast } from '$libs/toast/toast';
	import { goto } from '$app/navigation';
	export let form: any;

	let isSubmitting: boolean = false;

	$: console.log(form);

	$: if (form?.message?.isDone) isSubmitting = false;
	$: if (form?.message?.isSuccess) goto(`/createQuiz/${form?.success?.id}`);
	let selectedLevel: string;
	let levelList: selectOptionne[] = [
		{ value: 0, name: 'Easy' },
		{ value: 1, name: 'Medium' },
		{ value: 2, name: 'Hard' }
	];

	let formData: FieldForm = {
		title: '',
		difficultyLevel: '',
		startDate: '',
		endDate: '',
		passingPoint: '',
		description: '',
		image: ''
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
</script>

<form
	class="my-6 flex flex-col space-y-4 items-center bg-white shadow-2xl p-6 rounded-lg dark:bg-gray-800 dark:text-white dark:shadow-none dark:border-gray-600 dark:border-2"
	action="?/createQuiz"
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
	<div class="grid md:grid-cols-2 gap-4 grid-cols-1">
		{#each inputFormList as { label, name, type, required, selectOptionsList }}
			<div>
				<Label class="space-y-2 block text-base font-medium text-gray-900 dark:text-w">
					{label} <span class="text-red-600">{required ? '*' : ''}</span>
				</Label>
				{#if type === 'file'}
					<input type="file" name="image" accept="image/*" class="text-base" />
					{#if form?.messsage?.error?.missing?.image}
						<p class="mt-1 text-base text-red-500 dark:text-gray-300">
							{form?.message?.error?.message?.image}
						</p>
					{:else}
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
						bind:value={selectedLevel}
						{required}
						id={name}
						{name}
						class="bg-gray-50 border border-graydish text-gray-700 text-base rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
					/>
				{:else if type === 'textarea'}
					<textarea
						maxlength="100"
						id={name}
						{type}
						placeholder={label}
						{name}
						class="bg-gray-50 border border-graydish text-gray-900 text-base rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					/>
				{:else}
					<input
						minlength="10"
						maxlength="50"
						id={name}
						{type}
						placeholder={label}
						{name}
						{required}
						class="bg-gray-50 border border-graydish text-gray-900 text-base rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
					/>
					{#if form?.error?.missing?.title && name === `title`}
						<p class="mt-1 text-base text-red-500 dark:text-gray-300">
							{form?.messsage?.error?.message?.title}
						</p>
					{:else if form?.error?.missing?.passingPoint && name === `passingPoint`}
						<p class="mt-1 text-base text-red-500 dark:text-gray-300">
                            {form?.messsage?.error?.message?.passingPoint}
						</p>
					{:else if form?.error?.missing?.point && name === `point`}
						<p class="mt-1 text-base text-red-500 dark:text-gray-300">
							{form?.messsage?.error?.message?.point}
						</p>
					{/if}
				{/if}
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
