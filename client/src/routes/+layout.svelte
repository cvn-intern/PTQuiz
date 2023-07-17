<script lang="ts">
	import '../app.css';
	import Navbar from '../components/layout/navbar.svelte';
	import Footer from '../components/layout/footer.svelte';
	import { Toaster } from 'svelte-french-toast';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Toaster />
<Navbar user={data.user} />
<div class="min-h-screen bg-background">
	<slot />
</div>
<Footer />
