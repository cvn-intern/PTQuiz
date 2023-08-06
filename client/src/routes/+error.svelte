<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$components/layout/footer.svelte';
	import Navbar from '$components/layout/navbar.svelte';
	import { onMount } from 'svelte';
	import { t } from '../libs/i18n/translations';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<Navbar user={data.user} />
<main class="flex flex-1 bg-background">
	<div class="w-screen bg-gray-50 flex items-center">
		<div
			class="container flex flex-col md:flex-row sm:flex-row items-center justify-between px-5 text-gray-700"
		>
			<div class="w-full lg:w-1/2 md:w-1/3 sm:w-1/3 mx-8">
				<div class="text-7xl text-secondary font-dark font-extrabold mb-8">
					{$page.error?.code}
				</div>
				<p class="text-2xl md:text-3xl sm:text-2xl font-light leading-normal mb-8">
					{#if $page.error?.code === 404}
						{$t('common.notFoundMessage')}
					{:else}
						{$t('common.internalServerError') + ', ' + $t('common.pleaseTryAgain')}
					{/if}
				</p>

				<a
					href="/"
					class="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-secondary active:bg-darkGreen hover:bg-darkGreen"
					>{$t('common.backHome')}</a
				>
			</div>
			<div class="w-full lg:flex lg:justify-end lg:w-1/2 md:w-1/3 sm:w-1/3 mx-5 my-12">
				<img
					src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
					class=""
					alt="Page not found"
				/>
			</div>
		</div>
	</div>
</main>
<Footer />
