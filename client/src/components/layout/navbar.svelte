<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Chevron, Dropdown, DropdownItem } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import SidebarModal from './sidebar/sidebarModal.svelte';
	import { goto } from '$app/navigation';
	import logo from '../../assets/logo.png';
	import { t, locale, locales } from '$i18n/translations';
	import type { LayoutData } from '../../routes/$types';
	import { AppRoute } from '../../libs/constants/appRoute';
	import { onMount } from 'svelte';
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
	let discoveryClicked = false;
	onMount(() => {
		discoveryClicked = false;
	});
	function handleClickExitButton() {
		if (!discoveryClicked) {
			goto('/discovery');
			discoveryClicked = true;
		}
	}
</script>

<nav
	class="navbar bg-primary w-full flex justify-between px-4 lg:px-16 py-4 items-center sticky top-0 z-40"
>
	<button on:click={toggleSidebar} class="md:hidden">
		<Icon icon="material-symbols:list" class="text-5xl" />
	</button>
	<a class="logo flex items-center gap-2" href="/">
		<img src={logo} alt="logo" class="hidden md:block w-16" />
		<h1 class="hidden text-2xl md:block md:text-3xl font-bold font-title text-darkGreen">
			PentaQuiz
		</h1>
	</a>
	<SidebarModal hiddenModal={isHidden} {user} />
	<div class="flex items-center gap-24">
		<ul class="hidden md:flex gap-2 md:gap-8 text-xl font-medium">
			<li>
				<a href="/" title={$t('common.home')} class="hover:text-secondary"
					>{$t('common.home')}</a
				>
			</li>
			<li>
				<button
					on:click={() => {
						if (!discoveryClicked) {
							goto('/discovery');
							discoveryClicked = true;
						}
					}}
					title={$t('common.discovery')}
					class={`hover:text-secondary ${
						discoveryClicked ? 'pointer-events-none opacity-50' : ''
					}`}
				>
					{$t('common.discovery')}
				</button>
			</li>
		</ul>
		<div class="flex gap-2">
			{#if user}
				<div class="flex items-center cursor-pointer">
					<button
						aria-label="profile"
						class="flex items-center gap-2 text-xl overflow-hidden whitespace-nowrap max-w-[250px] hover:text-secondary"
					>
						<img src={user.avatar} alt="user avatar" class="rounded-full w-12 h-12" />
						{user.displayName}
					</button>
					<Icon icon="gridicons:dropdown" class="text-2xl" />
				</div>
				<Dropdown data-placement="right-end">
					<DropdownItem
						class="flex gap-2 items-center"
						on:click={() => {
							goto('/dashboard/quizzes');
						}}
					>
						<Icon icon="tabler:home" class={'text-2xl'} />
						<h1 class="text-base">{$t('common.myQuizzes')}</h1>
					</DropdownItem>
					<DropdownItem
						class="flex gap-2 items-center"
						on:click={() => {
							goto('/dashboard/history');
						}}
					>
						<Icon icon="material-symbols:history" class={'text-2xl'} />
						<h1 class="text-base">{$t('common.history')}</h1>
					</DropdownItem>
					<DropdownItem
						class="flex gap-2 items-center"
						on:click={() => {
							goto('/dashboard/profile');
						}}
					>
						<Icon icon="mingcute:user-setting-fill" class={'text-2xl'} />
						<h1 class="text-base">{$t('common.profile')}</h1>
					</DropdownItem>
					<DropdownItem slot="footer" class="flex gap-2 items-center" on:click={logout}>
						<Icon icon="mdi:logout" class={'text-2xl'} />
						<h1 class="text-base">{$t('common.signOut')}</h1>
					</DropdownItem>
				</Dropdown>
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
			<select name="locale" bind:value={$locale} on:change={handleChange} class="rounded-xl">
				{#each $locales as value}
					<option {value}>{value} </option>
				{/each}
			</select>
		</div>
	</div>
</nav>
