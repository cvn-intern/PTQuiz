<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import CardQuestion from './cardQuestion.svelte';
	import ModalInforQuizzes from './modalInforQuiz.svelte';
	import Icon from '@iconify/svelte';
	export let classSidaBar: any;
	export let cardListQuestion: string[];
</script>

<div class={classSidaBar}>
	<ModalInforQuizzes
		defaultOpenModal={false}
		classButton={'"w-2/3 h-10 text-zinc-950 border bg-gray-200 hover:bg-gray-400"'}
		nameClassButton={'Information Quiz'}
	/>
	<div
		class="md:max-h-boxCardQuestion max-h-96 overflow-y-scroll w-full flex flex-col gap-4 border p-4"
	>
		{#each cardListQuestion as cardQuestion, index}
			<CardQuestion questionStt={index + 1} />
		{/each}
	</div>
	<hr class="bg-gray-950" />
	<Button class="bg-secondary text-white hover:bg-darkGreen">
		<Icon icon={'gridicons:add-outline'} class="text-xl mr-3" />
		Add Question
	</Button>
</div>
