<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import SidebarModal from './sidebar/sidebarModal.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import logo from '../../assets/logo.png';
	import { t, locale } from '$i18n/translations';
	import type { LayoutData } from '../../routes/$types';
	import { AppRoute } from '../../libs/constants/appRoute';
	import clsx from 'clsx';
	import DropdownProfile from '$components/dropdown/dropdownProfile.svelte';
	import DropdownLanguage from '$components/dropdown/dropdownLanguage.svelte';
	import { onMount } from 'svelte';
	import Loading from '$components/loading.svelte';
	export let user: LayoutData;

	const handleChange = async (currentTarget: any) => {
		const { value } = currentTarget.target;
		$locale = value;
		const response = await fetch('/api/changeLocale', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ locale: value })
		});
	};
	let isHidden: boolean = true;
	const logout = async () => {
		const response = await fetch('/api/auth/logout', {
			method: 'POST'
		});
		if (response.status === 200) {
			invalidateAll();
			window.location.href = AppRoute.HOME;
		}
	};
	const toggleSidebar = () => {
		isHidden = !isHidden;
	};
	async function handleClose(e) {
		isHidden = false;
	}
	let isLoading = false;
	function handleOptionClick(value: any) {
		$locale = value;
		handleChange({ target: { value } });
		window.location.reload();
		isLoading = true;
	}

</script>

{#if isLoading}
	<Loading />
{/if}
<nav
	class="navbar bg-primary w-full flex justify-between px-4 lg:px-16 py-4 items-center sticky top-0 z-40"
>
	<button on:click={toggleSidebar} class="md:hidden" on:close={handleClose}>
		<Icon icon="material-symbols:list" class="text-5xl" />
	</button>
	<a class="logo flex items-center gap-2" href="/">
		<img src={logo} alt="logo" class="hidden md:block w-16" />
		<h1 class="hidden text-2xl md:block md:text-3xl font-bold font-title text-darkGreen">
			Quiz<sup class="text-lg md:text-xl text-orangeLogo">P</sup><sup
				class="text-lg md:text-xl text-blueLogo">T</sup
			>
		</h1>
	</a>
	<SidebarModal bind:hiddenModal={isHidden} {user} />
	<div class="flex items-center gap-24">
		<ul class="hidden md:flex gap-2 md:gap-8 text-xl font-medium">
			<li>
				<a
					href="/"
					title={$t('common.home')}
					class={clsx('hover:text-secondary', {
						'text-secondary': $page.url.pathname === '/'
					})}>{$t('common.home')}</a
				>
			</li>
			<li>
				<button
					on:click={() => {
						goto('/discovery/all');
					}}
					title={$t('common.discovery')}
					class={clsx('hover:text-secondary', {
						'text-secondary': $page.url.pathname.includes('/discovery')
					})}
				>
					{$t('common.discovery')}
				</button>
			</li>
		</ul>
		<div class="flex gap-2 items-center md:w-userInfo justify-end">
			{#if user}
				<DropdownProfile {user} {logout} />
			{:else}
				<button
					aria-label="login"
					class="py-2 px-6 bg-secondary rounded-lg text-xl text-white hover:bg-buttonHover focus:outline-none"
					on:click={() => {
						goto('/login');
					}}
				>
					{$t('common.login')}
				</button>
			{/if}
			<DropdownLanguage {handleOptionClick} />
		</div>
	</div>
</nav>
