<script lang="ts">
	import LandingPage from '../components/landingPage/landingPage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<LandingPage/>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
	
</style>
