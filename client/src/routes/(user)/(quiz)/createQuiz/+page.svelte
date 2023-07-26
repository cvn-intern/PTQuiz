<script lang="ts">
	import { goto } from '$app/navigation';
	import ModalInforQuiz from '$components/createQuiz/modalInforQuiz.svelte';
	import { Button } from 'flowbite-svelte';
	import { t } from '$i18n/translations';
	let defautlOpenModal = true;
	export let form;
</script>

<div class="w-full h-96 flex justify-center items-center gap-6">
	<Button
		class="bg-red-500 shadow-md"
		on:click={() => {
			goto('/');
		}}>Back Home</Button
	>
	<ModalInforQuiz
		defaultOpenModal={true}
		outsideclose={false}
		classButton={'text-zinc-950 border bg-white hover:bg-gray-400 shadow-md'}
		nameClassButton={'Contrinue create quiz'}
		form={form}
	/>
</div>
