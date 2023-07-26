<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, Chevron, Radio } from 'flowbite-svelte';
	$: group1 = 1;
</script>

<Button class="text-slate-900 border bg-gray-200 hover:bg-gray-400">
	<Chevron>Change type question</Chevron></Button
>
<Dropdown class="w-48 p-3 space-y-1">
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="group2" bind:group={group1} value={1}>Single Choice</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="group2" bind:group={group1} value={2}>Multiple Choice</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="group2" bind:group={group1} value={3}>True/False</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="group2" bind:group={group1} value={4}>Cross Character</Radio>
	</li>
</Dropdown>
