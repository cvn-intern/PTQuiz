<script>
	import { goto } from '$app/navigation';
	import ModalInforQuiz from '$components/createQuiz/modalInforQuiz.svelte';
	import { Button } from 'flowbite-svelte';
	let defautlOpenModal = true;
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
		nameClassButton={'Continue create quiz'}
	/>
</div>
