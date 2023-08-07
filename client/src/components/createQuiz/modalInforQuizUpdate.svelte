<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import FormQuiz from './formQuiz.svelte';
	export let classButton: string;
	export let defaultOpenModal: boolean;
	export let form: any;
	export let result: any;
	let isSubmitting: boolean = false;

	$: if (form?.isDone) isSubmitting = false;
	let formModal = defaultOpenModal;
	export let outsideclose = true;
	export let nameClassButton: string;
	
</script>

<Button on:click={() => (formModal = true)} class={classButton}>
	<Icon icon={'carbon:information'} class={'mr-3'} /> {nameClassButton}</Button
>

<Modal bind:open={formModal} size="md" class="w-full z-50" {outsideclose} autoclose={false}>
	<FormQuiz bind:result bind:form action={'?/updateQuiz'} isUpdate={true} bind:open={formModal} />
</Modal>
