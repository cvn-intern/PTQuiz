<script lang="ts">
	import Toast from '$components/toast.svelte';
	import FormQuiz from '$components/createQuiz/formQuiz.svelte';
	import ToastSucess from '$components/toastSucess.svelte';
	export let form;
	let result = {
		title: '',
		difficultyLevel: '',
		passingPoint: '',
		point: '',
		description: '',
		image: ''
	};
	$: console.log('form',form);
</script>

<ToastSucess {form} />

<div class="w-full flex justify-center items-center gap-6 bg-white shadow-2xl">
	<FormQuiz bind:form result={result} action="?/createQuiz" isUpdate={false} />
</div>
