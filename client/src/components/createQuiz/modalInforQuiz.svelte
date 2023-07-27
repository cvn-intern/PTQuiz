<script lang="ts">
	import { t } from '$i18n/translations';
	import { Button, Modal, Label, Input, Select, Textarea } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { FieldForm, InputForm, selectOptionne } from './interface/createQuiz.interface';
	import { showLoadingToast, dismissLoadingToast } from '$libs/toast/toast';
	import toast from 'svelte-french-toast';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	export let classButton: string;
	export let defaultOpenModal: boolean;
	export let form: any;

	let isProcessing: boolean = false;

	const handleSubmit = async (): Promise<void> => {
		if (isProcessing) return;
		isProcessing = true;
		form = null;

		showLoadingToast();

		while (!form?.isDone) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		dismissLoadingToast();
		isProcessing = false;

		if (form?.isSuccess) {
			toast.success(t.get('common.success'));
			goto(`/createQuiz/${form?.success?.id}`);
		} else {
			dismissLoadingToast();
			toast.error(form?.error.message);
		}
	};

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
			selectOptionsList: levelList,
			required: true
		},
		{
			label: `${$t('common.startDate')}`,
			name: 'startDate',
			type: 'date',
			required: false
		},
		{
			label: `${$t('common.passingPoint')}`,
			name: 'passingPoint',
			type: 'number',
			required: true
		},
		{
			label: `${$t('common.endDate')}`,
			name: 'endDate',
			type: 'date',
			required: false
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
			{$t('common.informationQuiz')}
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
						<textarea
							id={name}
							{type}
							placeholder={label}
							{name}
							class="bg-gray-50 border border-graydish text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						/>
					{:else}
						<input
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
			on:click={handleSubmit}
			class="w-full text-white bg-secondary hover:bg-darkGreen focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-sm px-5 py-2.5 text-center"
			>{$t('common.save')}</Button
		>
	</form>
</Modal>
