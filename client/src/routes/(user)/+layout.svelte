<script lang="ts">
	import '../../app.css';
	import { Toaster } from 'svelte-french-toast';
	import Navbar from '../../components/layout/navbar.svelte';
	import Footer from '../../components/layout/footer.svelte';
	export let data;
</script>

<Navbar user={data.user} />
<main class="flex flex-1 bg-background">
	<slot />
</main>
<Footer />
