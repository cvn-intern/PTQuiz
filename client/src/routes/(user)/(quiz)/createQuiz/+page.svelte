<script lang="ts">

	import Toast from '$components/toast.svelte';
	import FormQuiz from '$components/createQuiz/formQuiz.svelte';
	export let form;
	
</script>

<Toast {form} />

<div class="w-full flex justify-center items-center gap-6 bg-white shadow-2xl">
	<FormQuiz bind:form />
</div>
