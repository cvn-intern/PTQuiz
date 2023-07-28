<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from 'flowbite-svelte';
	import { t } from '$i18n/translations';
	import ModalInforQuiz from '$components/createQuiz/modalInforQuiz.svelte';
	let defautlOpenModal = true;
	export let form;
</script>

<div class="w-full h-96 flex justify-center items-center gap-6">
	<Button
		class="bg-red-500 shadow-md"
		on:click={() => {
			goto('/');
		}}>{$t('common.backHome')}</Button
	>
	<ModalInforQuiz
		bind:form
		defaultOpenModal={defautlOpenModal}
		outsideclose={false}
		classButton={'text-zinc-950 border bg-white hover:bg-gray-400 shadow-md'}
		nameClassButton={$t('common.createQuiz')}
	/>
</div>
