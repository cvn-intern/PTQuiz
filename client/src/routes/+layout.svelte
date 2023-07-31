<script lang="ts">
	import Loading from '$components/loading.svelte';
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { navigationIsDelayed } from '$stores/navigationIsDelayed';
</script>

<Toaster />
{#if $navigationIsDelayed}
	<Loading />
{/if}

<slot />
