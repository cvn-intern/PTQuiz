<script lang="ts">
	import { Button, Dropdown, Chevron, Radio } from 'flowbite-svelte';

	export let defaultSort = 0;
	$: typeOfSort = (() => {
		if (defaultSort === 0) return 'Increase date';
		if (defaultSort === 1) return 'Decrease date';
		if (defaultSort === 2) return 'Title [a-z]';
		if (defaultSort === 3) return 'Title [z-a]';
	})();
</script>

<Button class="text-slate-900 border bg-gray-200 hover:bg-gray-400 w-40">
	<Chevron>{typeOfSort}</Chevron></Button
>
<Dropdown class="w-full p-1 space-y-1">
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfSort" bind:group={defaultSort} value={0}>Increase date</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfSort" bind:group={defaultSort} value={1}>Decrease date</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfSort" bind:group={defaultSort} value={2}>Title [a-z]</Radio>
	</li>
	<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
		<Radio name="typeOfSort" bind:group={defaultSort} value={3}>Title [z-a]</Radio>
	</li>
</Dropdown>
