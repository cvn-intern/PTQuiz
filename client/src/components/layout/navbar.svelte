<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Chevron, Dropdown, DropdownItem } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import SidebarModal from './sidebar/sidebarModal.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import logo from '../../assets/logo.png';
	import { t, locale, locales } from '$i18n/translations';
	import type { LayoutData } from '../../routes/$types';
	import { AppRoute } from '../../libs/constants/appRoute';
	import { onMount } from 'svelte';
	import clsx from 'clsx';
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
	let isDropdownOpen = false;

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
		document.body.addEventListener('click', unToggleDropdown);
	}

	function handleOptionClick(value: any) {
		$locale = value;
		handleChange({ target: { value } });
		isDropdownOpen = false;
	}

	function unToggleDropdown() {
		isDropdownOpen = false;
		document.body.removeEventListener('click', unToggleDropdown);
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
			Quiz<sup class="text-lg md:text-xl text-orangeLogo">P</sup><sup
				class="text-lg md:text-xl text-blueLogo">T</sup
			>
		</h1>
	</a>
	<SidebarModal hiddenModal={isHidden} {user} />
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
		<div class="flex gap-2 items-center w-userInfo justify-end">
			{#if user}
				<button class="flex items-center cursor-pointer">
					<div
						aria-label="profile"
						class="flex items-center gap-2 hover:text-secondary max-w-dropDown"
					>
						<img src={user.avatar} alt="user avatar" class="rounded-full w-10 h-10" />
						<p class="text-xl truncate">{user.displayName}</p>
					</div>
					<Icon icon="mingcute:down-line" class="text-2xl" />
				</button>
				<Dropdown class="w-dropDown">
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
			<div class="relative">
				<button
					class=" p-2 rounded-md focus:outline-none bg-primary"
					on:click|stopPropagation={toggleDropdown}
				>
					{#if $locale === 'en'}
						<Icon icon="twemoji-flag-for-flag-united-kingdom" class="text-3xl" />
					{:else}
						<Icon icon="twemoji-flag-for-flag-vietnam" class="text-3xl" />
					{/if}
				</button>
				{#if isDropdownOpen}
					<div class="absolute mt-2 w-full rounded-md shadow-lg">
						{#each $locales as value}
							<button
								class="cursor-pointer p-2 hover:bg-gray-200"
								on:click={() => handleOptionClick(value)}
							>
								{#if value === 'en'}
									<Icon
										icon="twemoji-flag-for-flag-united-kingdom"
										class="text-3xl"
									/>
								{:else}
									<Icon icon="twemoji-flag-for-flag-vietnam" class="text-3xl" />
								{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>
