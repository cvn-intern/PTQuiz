<script lang="ts">
	import LandingPage from '../components/landingPage/landingPage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<LandingPage />
