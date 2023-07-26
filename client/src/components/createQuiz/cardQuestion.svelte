<script lang="ts">
	import { Card,Button } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	export let questionStt: number;
	export let index: number;
	import {indexNow} from '$stores/indexNowStore';
	function editIndex(){
		indexNow.set({
			index: index
		});
	}
</script>

<Card padding="none">
	<div class="flex flex-col items-center py-4">
		<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Question {questionStt}</h5>
		<div class="flex mt-2 space-x-3 lg:mt-3">
			<Button class="border"
				><Icon icon={'iconamoon:trash-light'} class={'text-red-500 text-xl'} /></Button
			>
			<Button color="light" class="dark:text-white" on:click={editIndex}
				><Icon icon={'uil:edit'} class={'text-yellow-300 text-xl'} /></Button
			>
		</div>
	</div>
</Card>
