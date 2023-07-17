<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	export let user: {
		avatar: string;
	};
	let isOpen: boolean = false;

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
	import Icon from '@iconify/svelte';
	import SidebarModal from './sidebar/sidebarModal.svelte';

	const logout = async () => {
		const response = await fetch('/api/auth/logout');
		if (response.status === 200) {
			invalidateAll();
			window.location.href = '/';
		}
	};
	const toggleSidebar = () => {
		isOpen = !isOpen;
	};
</script>

<nav
	class="navbar bg-primary w-full flex justify-between px-4 lg:px-16 py-4 items-center sticky top-0"
>
	<div class="flex items-center gap-2">
		{#if user}
			<button on:click={toggleSidebar} class="md:hidden">
				<Icon icon="material-symbols:list" class="text-4xl " />
			</button>
		{/if}
		<a class="logo" href="/">
			<h1 class="text-xl md:block md:text-3xl font-bold font-title text-darkGreen">
				PentaQuiz
			</h1>
		</a>
	</div>
	<SidebarModal showModal={isOpen} />
	<div class="flex items-center gap-24">
		<ul class="hidden md:flex gap-2 md:gap-8 text-2xl">
			{#each navs as { title, href }}
				<li>
					<a {href} {title} class="hover:text-darkGreen">{title}</a>
				</li>
			{/each}
		</ul>
		<div class="flex gap-2 items-center" aria-labelledby="navbar">
			{#if user}
				<button
					aria-label="profile"
					class="w-16"
					on:click={() => {
						window.location.href = '/dashboard/profile';
					}}
				>
					<img src={user.avatar} alt="user avatar" class="border rounded-full" />
				</button>
				<button
					aria-label="logout"
					on:click={logout}
					class="py-3 px-3 flex gap-2 items-center"
				>
					<h1 class="text-black text-2xl">Log Out</h1>
					<Icon icon="mdi:logout" class="text-2xl " />
				</button>
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
	</div>
</nav>
