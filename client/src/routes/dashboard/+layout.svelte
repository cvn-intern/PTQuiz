<script>
	import Sidebar from '../../components/layout/sidebar/sidebar.svelte';
</script>

<div class="flex gap-6 w-full">
	<div class="xl:w-2/12 lg:w-3/12 md:w-4/12">
		<Sidebar />
	</div>
	<div class="xl:w-10/12 lg:w-9/12 md:w-8/12 sm:w-full w-full">
		<slot />
	</div>
</div>
