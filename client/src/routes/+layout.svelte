<script lang="ts">
	import '../app.css';
	import Navbar from '../components/layout/navbar.svelte';
	import Footer from '../components/layout/footer.svelte';
	import type { LayoutData } from './$types';

    export let data: LayoutData;
</script>

<Navbar />
<!-- {#if data.user}
 <p>Logged in as {data.user.name}</p>
{/if} -->
<div class="min-h-screen bg-background">
	<slot/>
</div>
<Footer />
