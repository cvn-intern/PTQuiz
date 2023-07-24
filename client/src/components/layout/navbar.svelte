<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Chevron, Dropdown, DropdownItem } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import SidebarModal from './sidebar/sidebarModal.svelte';
	import { goto } from '$app/navigation';
	import logo from '../../assets/logo.png';
	import { navbarStore } from '../../libs/store/navbarStore';
	import clsx from 'clsx';
	import { t } from '$i18n/translations';
	export let user: {
		avatar: string;
		displayName: string;
	};
	let isHidden: boolean = true;
	const navs = [
		{
			title: $t('common.home'),
			href: '/'
		},
		{
			title: $t('common.discovery'),
			href: '/discovery'
		}
	];

	const logout = async () => {
		const response = await fetch('/api/auth/logout');
		if (response.status === 200) {
			invalidateAll();
			window.location.href = '/';
		}
	};
	const toggleSidebar = () => {
		isHidden = !isHidden;
	};
	$: isHiddenNavbar = false;
	navbarStore.subscribe((value) => {
		isHiddenNavbar = value.isFullScreen;
	});
</script>

<nav
	class={clsx('navbar bg-primary w-full flex justify-between px4 lg:px-16 py-4 items-center', {
		hidden: isHiddenNavbar,
		'sticky top-0 z-50': !isHiddenNavbar
	})}
>
	{#if user}
		<button on:click={toggleSidebar} class="md:hidden">
			<Icon icon="material-symbols:list" class="text-5xl" />
		</button>
		<a class="logo flex items-center gap-2" href="/">
			<img src={logo} alt="logo" class="hidden md:block w-16" />
			<h1 class="hidden text-2xl md:block md:text-3xl font-bold font-title text-darkGreen">
				PentaQuiz
			</h1>
		</a>
	{:else}
		<a class="logo flex items-center gap-2" href="/">
			<img src={logo} alt="logo" class="w-16" />
			<h1 class="text-2xl md:block md:text-3xl font-bold font-title text-darkGreen">
				PentaQuiz
			</h1>
		</a>
	{/if}
	<SidebarModal hiddenModal={isHidden} />
	<div class="flex items-center gap-24">
		<ul class="hidden md:flex gap-2 md:gap-8 text-xl font-medium">
			<!-- {#each navs as { title, href }}
				<li>
					<a {href} {title} class="hover:text-secondary">{title}</a>
				</li>
			{/each} -->
			<li>
				<a href="/" title={$t('common.home')} class="hover:text-secondary"
					>{$t('common.home')}</a
				>
			</li>
			<li>
				<a href="/discovery" title={$t('common.discovery')} class="hover:text-secondary">
					{$t('common.discovery')}
				</a>
			</li>
		</ul>
		{#if user}
			<div class="flex items-center cursor-pointer">
				<Chevron>
					<button
						aria-label="profile"
						class="flex items-center gap-2 text-xl overflow-hidden whitespace-nowrap max-w-[250px] hover:text-secondary"
					>
						<img src={user.avatar} alt="user avatar" class="rounded-full w-12" />
						{user.displayName}
					</button>
				</Chevron>
			</div>

			<Dropdown>
				<DropdownItem
					class="flex gap-2 items-center"
					on:click={() => {
						goto('/dashboard/quizzes');
					}}
				>
					<Icon icon="tabler:home" class={'text-2xl'} />
					<h1 class="text-base">My Quizzes</h1>
				</DropdownItem>
				<DropdownItem
					class="flex gap-2 items-center"
					on:click={() => {
						goto('/dashboard/history');
					}}
				>
					<Icon icon="material-symbols:history" class={'text-2xl'} />
					<h1 class="text-base">History</h1>
				</DropdownItem>
				<DropdownItem
					class="flex gap-2 items-center"
					on:click={() => {
						goto('/dashboard/profile');
					}}
				>
					<Icon icon="mingcute:user-setting-fill" class={'text-2xl'} />
					<h1 class="text-base">Profile</h1>
				</DropdownItem>
				<DropdownItem slot="footer" class="flex gap-2 items-center" on:click={logout}>
					<Icon icon="mdi:logout" class={'text-2xl'} />
					<h1 class="text-base">Sign Out</h1>
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
	</div>
</nav>
