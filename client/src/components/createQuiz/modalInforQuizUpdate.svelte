<script lang="ts">
	import { t } from '$i18n/translations';
	import { Button, Modal, Label, Input, Select, Textarea } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { FieldForm, InputForm, selectOptionne } from './interface/createQuiz.interface';
	import { showLoadingToast, dismissLoadingToast } from '$libs/toast/toast';
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
	<FormQuiz bind:result {form} action={'?/updateQuiz'} isUpdate={true}/>
</Modal>
