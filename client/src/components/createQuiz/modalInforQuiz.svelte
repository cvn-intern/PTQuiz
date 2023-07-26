<script lang="ts">
	import { t } from '$i18n/translations';
	import { Button, Modal, Label, Input, Fileupload, Select, Textarea } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { FieldForm, InputForm, selectOptionne } from './interface/createQuiz.interface';
	import Icon from '@iconify/svelte';
	export let classButton: string;
	export let defaultOpenModal: boolean;
	// let selectedCategory: string;
	// let categoryList: selectOptionne[] = [
	// 	{ value: 'clk6mopdw0005j3ngsixir2g2', name: 'Math' },
	// 	{ value: 'clkjsqieu0000k6m5sqfi4gj5', name: 'English' },
	// 	{ value: 'clk6mp0ik0006j3ngfaep8pb8', name: 'Science' },
	// 	{ value: 'clkjsrewf0001k6m5bpxteo0t', name: 'History' },
	// 	{ value: 'clkjsrewg0002k6m565jmkvvw', name: 'Geography' },
	// 	{ value: 'clkjsrewg0003k6m5tpo9b8nx', name: 'Literature' },
	// 	{ value: 'clkjsrewg0004k6m5dt89zll5', name: 'Other' }
	// ];

	let selectedLevel: string;
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
			required: true
		},
		{
			label: `${$t('common.level')}`,
			name: 'difficultyLevel',
			type: 'select',
			required: true,
			selectOptionsList: levelList
		},
		{
			label: `${$t('common.startDate')}`,
			name: 'startDate',
			type: 'date',
			required: false
		},
		{
			label: `${$t('common.file')}`,
			name: 'image',
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
			label: `${$t('common.point')}`,
			name: 'point',
			type: 'number',
			required: true
		},
		{
			label: `${$t('common.passingPoint')}`,
			name: 'passingPoint',
			type: 'number',
			required: true
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

<Modal bind:open={formModal} size="md" class="w-full z-50" {outsideclose} autoclose={false}>
	<form
		class="flex flex-col space-y-4 items-center"
		action="?/createQuiz"
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
			{#each inputFormList as { label, name, type, required, selectOptionsList }}
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
							bind:value={selectedLevel}
							{required}
							id={name}
							{name}
							class="bg-gray-50 border border-graydish text-gray-700 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary"
						/>
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
