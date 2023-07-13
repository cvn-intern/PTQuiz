<script>
	import ModelInforQuizzes from '../../components/modelInforQuizzes.svelte';
	import SearchSort from '../../components/searchSort.svelte';
	import Sidebar from '../../components/sidebar.svelte';
</script>

<div class="flex gap-6">
	<div class="xl:w-2/12 lg:w-3/12 md:w-4/12">
		<Sidebar />
	</div>
	<div class="xl:w-10/12 lg:w-9/12 md:w-8/12 sm:w-full w-full">
		<SearchSort />
		<ModelInforQuizzes />
	</div>
</div>
