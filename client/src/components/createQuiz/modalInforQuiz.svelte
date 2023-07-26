<script lang="ts">
	import { t } from '$i18n/translations';
	import {
		Button,
		Modal,
		Label,
		Input,
		Fileupload,
		Toggle,
		Select,
		Textarea
	} from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { FieldForm, InputForm } from './interface/createQuiz.interface';
	import Icon from '@iconify/svelte';
	export let classButton: string;
	export let defaultOpenModal: boolean;

	let formModal = defaultOpenModal;
	let formData: FieldForm = {
		titleQuiz: '',
		category: '',
		customizeTimeQuestion: '',
		level: '',
		shareQuiz: false,
		startDate: '',
		thumbnail: '',
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
			label: `${$t('common.titleQuiz')}`,
			name: 'titleQuiz',
			type: 'text',
			required: true
		},
		{
			label: `${$t('common.category')}`,
			name: 'category',
			type: 'select',
			required: true,
			selectOptionsList: [
				'Math',
				'English',
				'Science',
				'History',
				'Geography',
				'Literature',
				'Other'
			]
		},
		{
			label: `${$t('common.customizeTimeQuestion')}`,
			name: 'customizeTimeQuestion',
			type: 'select',
			required: false,
			selectOptionsList: ['Default', 'Customize']
		},
		{
			label: `${$t('common.level')}`,
			name: 'level',
			type: 'select',
			required: false,
			selectOptionsList: ['Easy', 'Medium', 'Hard']
		},
		{
			label: `${$t('common.shareYourQuiz')}`,
			name: 'shareQuizzes',
			type: 'switch',
			required: false,
			isDefault: true
		},
		{
			label: `${$t('common.startDate')}`,
			name: 'startDate',
			type: 'date',
			required: false
		},
		{
			label: `${$t('common.thumbnail')}`,
			name: 'thumbnail',
			type: 'file',
			required: false
		},
		{
			label: `${$t('common.endDate')}`,
			name: 'endDate',
			type: 'date',
			required: false
		},
		{
			label: `${$t('common.passingPoint')}`,
			name: 'passingPoint',
			type: 'number',
			required: false
		},
		{
			label: `${$t('common.description')}`,
			name: 'description',
			type: 'textarea',
			required: false
		}
	];
	export let outsideclose = true;
	export let nameClassButton: string;
</script>

<Button on:click={() => (formModal = true)} class={classButton}>
	<Icon icon={'carbon:information'} class={'mr-3'} /> {nameClassButton}</Button
>

<Modal bind:open={formModal} size="md" class="w-full z-50" {outsideclose}>
	<form
		class="flex flex-col space-y-4 items-center"
		action="?/createQuizz"
		method="post"
		use:enhance={() => {
			return async ({ update }) => {
				await update({ reset: false });
			};
		}}
		enctype="multipart/form-data"
	>
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">
			{$t('common.informationQuizzes')}
		</h3>
		<div class="grid grid-cols-2 gap-4">
			{#each inputFormList as { label, name, type, required, selectOptionsList, isDefault }}
				<div>
					<Label class="space-y-2 block text-sm font-medium text-gray-900 dark:text-w">
						{label} <span class="text-red-600">{required ? '*' : ''}</span>
					</Label>
					{#if type === 'file'}
						<Fileupload {name} accept=".jpg, .jpeg, .png" />
						<p
							class="mt-1 text-sm text-gray-500 dark:text-gray-300"
							id="file_input_help"
						>
							JPEG, PNG, JPG (5MB).
						</p>
					{:else if type === 'switch'}
						<Toggle checked={false} {name} {required} value="">
							{isDefault
								? `${$t('common.privateQuizzes')}`
								: `${$t('common.publicQuizzes')}`}</Toggle
						>
					{:else if type === 'select'}
						<Select
							{required}
							id={name}
							{name}
							class="bg-gray-50 border border-graydish text-gray-700 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
						>
							{#if selectOptionsList?.length === 0}
								<option>None</option>
							{:else if selectOptionsList !== undefined}
								{#each selectOptionsList as option}
									<option>{option}</option>
								{/each}
							{/if}
						</Select>
					{:else if type === 'textarea'}
						<Textarea
							id={name}
							{type}
							placeholder={label}
							{name}
							class="bg-gray-50 border border-graydish text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						/>
					{:else}
						<Input
							id={name}
							{type}
							placeholder={label}
							{name}
							{required}
							class="bg-gray-50 border border-graydish text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						/>
					{/if}
				</div>
			{/each}
		</div>

		<Button
			type="submit"
			class="w-full text-white bg-secondary hover:bg-darkGreen focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-sm px-5 py-2.5 text-center"
			>{$t('common.save')}</Button
		>
	</form>
</Modal>
