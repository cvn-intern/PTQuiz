<script>
	import Search from './search.svelte';
	import SortDateComponent from './sortDateComponent.svelte';
</script>

<div class="flex w-full gap-3 justify-end lg:p-5 sm:pt-5 pt-5">
	<div class="xl:w-11/12 lg:w-10/12 md:w-9/12 sm:w-9/12 w-8/12">
		<Search />
	</div>
	<div class="xl:w-1/12 lg:w-2/12 md:w-3/12 sm:w-3/12 w-4/12">
		<SortDateComponent />
	</div>
</div>
