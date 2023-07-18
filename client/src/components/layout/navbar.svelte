<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import SidebarModal from './sidebar/sidebarModal.svelte';
	import { goto } from '$app/navigation';
	import logo from '../../assets/draft1.png';

	export let user: {
		avatar: string;
		displayName: string;
	};
	let isHidden: boolean = true;
	const navs = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Discovery',
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
</script>

<nav
	class="navbar bg-primary w-full flex justify-between px-4 lg:px-16 py-4 items-center sticky top-0 z-40"
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
		<ul class="hidden md:flex gap-2 md:gap-8 text-2xl font-medium">
			{#each navs as { title, href }}
				<li>
					<a {href} {title} class="hover:text-secondary">{title}</a>
				</li>
			{/each}
		</ul>
		{#if user}
			<div class="flex gap-2 items-center cursor-pointer" aria-labelledby="navbar">
				<button aria-label="profile" class="w-14">
					<img
						src={user.avatar}
						alt="user avatar"
						class="border-2 border-darkGreen rounded-full"
					/>
				</button>
				<h1
					class="text-xl overflow-hidden whitespace-nowrap max-w-[200px] hover:text-secondary"
				>
					{user.displayName}
				</h1>
			</div>
			<Dropdown>
				<DropdownItem
					class="flex gap-2 items-center"
					on:click={() => {
						goto('/dashboard/quizzes');
					}}
				>
					<Icon icon="tabler:home" class={'text-xl'} />
					My Quizzes</DropdownItem
				>
				<DropdownItem
					class="flex gap-2 items-center"
					on:click={() => {
						goto('/dashboard/history');
					}}
				>
					<Icon icon="material-symbols:history" class={'text-xl'} />
					History</DropdownItem
				>
				<DropdownItem
					class="flex gap-2 items-center"
					on:click={() => {
						goto('/dashboard/profile');
					}}
				>
					<Icon icon="mingcute:user-setting-fill" class={'text-xl'} />
					Profile</DropdownItem
				>
				<DropdownItem slot="footer" class="flex gap-2 items-center" on:click={logout}>
					<Icon icon="mdi:logout" class={'text-xl'} />

					Sign out</DropdownItem
				>
			</Dropdown>
		{:else}
			<button
				aria-label="login"
				class="py-2 px-6 bg-secondary rounded-lg text-xl text-white hover:bg-buttonHover focus:outline-none"
				on:click={() => {
					window.location.href = '/login';
				}}
			>
				LOGIN
			</button>
		{/if}
	</div>
</nav>
