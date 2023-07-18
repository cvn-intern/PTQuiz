<script lang="ts">
	import '../app.css';
	import Navbar from '../components/layout/navbar.svelte';
	import Footer from '../components/layout/footer.svelte';
	import { Toaster } from 'svelte-french-toast';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Toaster />
<div class="min-h-screen flex flex-col bg-background">
	<Navbar user={data.user} />
	<slot />
</div>
<Footer />
