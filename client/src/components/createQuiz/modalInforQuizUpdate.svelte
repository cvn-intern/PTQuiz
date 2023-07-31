<script lang="ts">
	import { t } from '$i18n/translations';
	import { Button, Modal, Label, Input, Select, Textarea } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { FieldForm, InputForm, selectOptionne } from './interface/createQuiz.interface';
	import { showLoadingToast, dismissLoadingToast } from '$libs/toast/toast';
	import Icon from '@iconify/svelte';
	export let classButton: string;
	export let defaultOpenModal: boolean;
	export let form: any;
	export let result: any;
	let isSubmitting: boolean = false;

	$: if (form?.isDone) isSubmitting = false;

	let levelList: selectOptionne[] = [
		{ value: 0, name: 'Easy' },
		{ value: 1, name: 'Medium' },
		{ value: 2, name: 'Hard' }
	];

	let formModal = defaultOpenModal;
	let formData: FieldForm = {
		title: '',
		difficultyLevel: '',
		startDate: '',
		endDate: '',
		passingPoint: '',
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
			required: true,
			value: result.title
		},
		{
			label: `${$t('common.level')}`,
			name: 'difficultyLevel',
			type: 'select',
			selectOptionsList: levelList,
			required: true,
			value: result.difficultyLevel
		},
		{
			label: `${$t('common.passingPoint')}`,
			name: 'passingPoint',
			type: 'number',
			required: true,
			value: result.passingPoint
		},
		{
			label: `${$t('common.totalPoints')}`,
			name: 'point',
			type: 'number',
			required: true,
			value: result.point
		},
		{
			label: `${$t('common.file')}`,
			name: 'image',
			type: 'file',
			required: false,
			value: result.image
		},
		{
			label: `${$t('common.description')}`,
			name: 'description',
			type: 'textarea',
			required: false,
			value: result.description
		}
	];
	export let outsideclose = true;
	export let nameClassButton: string;
</script>

<Button on:click={() => (formModal = true)} class={classButton}>
	<Icon icon={'carbon:information'} class={'mr-3'} /> {nameClassButton}</Button
>

<Modal bind:open={formModal} size="md" class="w-full z-50" {outsideclose} autoclose={false}>
	<form
		class="flex flex-col space-y-4 items-center"
		action="?/updateQuiz"
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
			{#each inputFormList as { label, name, type, required, selectOptionsList, value }}
				<div>
					<Label class="space-y-2 block text-sm font-medium text-gray-900 dark:text-w">
						{label} <span class="text-red-600">{required ? '*' : ''}</span>
					</Label>
					{#if type === 'file'}
						<input type="file" name="image" />
						<p
							class="mt-1 text-sm text-gray-500 dark:text-gray-300"
							id="file_input_help"
						>
							JPEG, PNG, JPG (5MB).
						</p>
					{:else if type === 'select'}
						<Select
							items={selectOptionsList}
							bind:value
							{required}
							id={name}
							{name}
							class="bg-gray-50 border border-graydish text-gray-700 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
						/>
					{:else if type === 'textarea'}
						<textarea
							id={name}
							maxlength="100"
							type="textarea"
							placeholder={label}
							{name}
							bind:value
							class="bg-gray-50 border border-graydish text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						/>
					{:else}
						<input
							id={name}
							type="text"
							placeholder={label}
							{name}
							{required}
							bind:value
							class="bg-gray-50 border border-graydish text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						/>
					{/if}
				</div>
			{/each}
		</div>

		<Button
			type="submit"
			disabled={isSubmitting}
			class="w-full text-white bg-secondary hover:bg-darkGreen focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isSubmitting
				? 'opacity-50 cursor-wait'
				: ''} ">{$t('common.update')}</Button
		>
	</form>
</Modal>
