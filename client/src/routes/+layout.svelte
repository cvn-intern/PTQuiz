<script lang="ts">
	import '../app.css';
	import Navbar from '../components/layout/navbar.svelte';
	import Footer from '../components/layout/footer.svelte';
	import { Toaster } from 'svelte-french-toast';
	import type { LayoutData } from './$types';
	import { locales, locale, t } from '../libs/i18n/translations';
	import { navbarStore } from '../libs/store/navbarStore';
	import { get } from 'svelte/store';
	import Cookies from 'js-cookie';

	const handleChange = ({ currentTarget }) => {
        Cookies.set('lang', currentTarget.value);
	};
	export let data: LayoutData;
</script>

<Toaster />
<Navbar user={data.user} />
<main class="flex flex-1 bg-background">
	<slot />
</main>
<select bind:value={$locale} on:change={handleChange}>
	{#each $locales as value}
		<option {value}>{$t(`lang.${value}`)}</option>
	{/each}
</select>
<Footer />
