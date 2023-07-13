<script lang="ts">
	import Quizzes from '../../../components/quizzes/quizzes.svelte';
	import SearchSort from '../../../components/searchSort.svelte';
	export let data;
	let { quizzes } = data;
</script>

<SearchSort />
<Quizzes {quizzes} />
