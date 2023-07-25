<script lang="ts">
	import { Button, Modal, Label, Input, Fileupload, Toggle, Select } from 'flowbite-svelte';
	let formModal = false;
	interface InputForm {
		label: string;
		name: string;
		type: string;
		required: boolean;
		selectOptionsList?: string[];
		valueSwitchDefault?: string;
	}

	const inputFormList: InputForm[] = [
		{
			label: 'Title Quizzes',
			name: 'titleQuizzes',
			type: 'text',
			required: true
		},
		{
			label: 'Share your Quizzes',
			name: 'shareQuizzes',
			type: 'switch',
			required: true
		},
		{
			label: 'Category',
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
			label: 'Customize Time Question',
			name: 'customizeTimeQuestion',
			type: 'select',
			required: false,
			selectOptionsList: ['Default', 'Customize']
		},
		{
			label: 'Level',
			name: 'level',
			type: 'select',
			required: false,
			selectOptionsList: ['Easy', 'Medium', 'Hard']
		},
		{
			label: 'Date',
			name: 'date',
			type: 'date',
			required: false
		},
		{
			label: 'Thumbnail',
			name: 'thumbnail',
			type: 'file',
			required: false
		}
	];
</script>

<Button on:click={() => (formModal = true)} class="w-40 h-10 text-zinc-950"
	>Information Quizzes</Button
>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full" outsideclose>
	<form class="flex flex-col space-y-6" action="#">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
			Information your quizzes
		</h3>
		{#each inputFormList as { label, name, type, required, selectOptionsList, valueSwitchDefault }}
			<Label class="space-y-2 block mb-2 text-sm font-medium text-gray-900 dark:text-w">
				{label} <span class="text-red-600">{required ? '*' : ''}</span>
			</Label>
			{#if type === 'file'}
				<Fileupload />
				<p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
					SVG, PNG, JPG or GIF (MAX. 800x400px).
				</p>
			{:else if type === 'switch'}
				<Toggle>Private</Toggle>
			{:else if type === 'select'}
				<Select
					id={name}
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
			{:else}
				<Input id={name} type="text" placeholder={label} {name} {required} />
			{/if}
		{/each}
		<Button
			type="submit"
			class="w-full text-white bg-secondary hover:bg-darkGreen focus:ring-4 focus:outline-none focus:ring-primaryColor font-medium rounded-lg text-sm px-5 py-2.5 text-center"
			>Save</Button
		>
	</form>
</Modal>
