<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import CardQuestion from './cardQuestion.svelte';
	import ModalInforQuizzes from './modalInforQuizzes.svelte';
	import Icon from '@iconify/svelte';
	export let classSidaBar: any;
</script>

<div class={classSidaBar}>
	<ModalInforQuizzes />
	<div
		class="md:max-h-boxCardQuestion max-h-96 overflow-y-scroll w-full flex flex-col gap-4 border p-4"
	>
		<CardQuestion />
		<CardQuestion />
		<CardQuestion />
		<CardQuestion />
		<CardQuestion />
	</div>
	<hr class="bg-gray-950" />
	<Button class="bg-secondary text-white hover:bg-darkGreen">
		<Icon icon={'gridicons:add-outline'} class="text-xl mr-3" />
		Add Question
	</Button>
</div>
