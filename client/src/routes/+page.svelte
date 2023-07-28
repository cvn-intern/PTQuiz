<script lang="ts">
	import LandingPage from '$components/landingPage/landingPage.svelte';
	import Footer from '$components/layout/footer.svelte';
	import Navbar from '$components/layout/navbar.svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<Navbar user={data.user} />
<main class="flex flex-1 bg-background">
	<LandingPage />
</main>
<Footer />
