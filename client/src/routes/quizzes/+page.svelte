<script lang="ts">
	import Breadcrumb from '../../components/breadcrumb.svelte';
	import Quizzes from '../../components/quizzes/quizzes.svelte';
	import SearchSort from '../../components/searchSort.svelte';
	import Sidebar from '../../components/sidebar.svelte';

	export let data;
	let { quizzes } = data;
</script>

<section class="flex flex-row justify-start gap-4 h-full">
	<div class="xl:w-2/12 lg:w-3/12 md:w-4/12">
		<Sidebar />
	</div>
	<div class="xl:w-10/12 lg:w-9/12 md:w-8/12 sm:w-full w-full">
		<SearchSort />
		<Quizzes {quizzes} />
	</div>
</section>
