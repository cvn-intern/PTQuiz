<script>
	export let placeholder = '';
	export let id = '';
	import Icon from '@iconify/svelte';
</script>

<form class="relative">

	<input
		type="search"
		{id}
		class="block p-2 w-full z-20 text-sm text-gray-500 bg-gray-50 rounded-xl border-l-gray-50 border-l-2 border border-gray-300 focus:ring-secondary focus:border-secondary dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-secondary"
		{placeholder}
		required
		aria-label="Input Search"
	/>
	<button
		aria-label="Search"
		type="submit"
		class="absolute top-0 right-0 p-2 text-sm font-medium h-full text-white bg-secondary rounded-r-xl border border-gray-300 hover:bg-darkGreen focus:outline-none focus:ring-green-600 dark:bg-darkGreen dark:hover:bg-secondary"
	>
		<Icon icon="material-symbols:search" class="text-2xl " />
	</button>
</form>
