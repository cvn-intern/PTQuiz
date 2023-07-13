<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	export let user: {
		avatar: string;
	};
	const navs = [
		{
			title: 'Home',
			href: '/'
		},
		{
			title: 'Discovery',
			href: '/'
		},
		{
			title: 'Dashboard',
			href: '/'
		}
	];
	import Icon from '@iconify/svelte';

	const logout = async () => {
		console.log('logout');
		const response = await fetch('/api/auth/logout');
		if (response.status === 200) {
			invalidateAll();
		}
	};
</script>

<nav class="navbar bg-primary w-full flex justify-between px-2 lg:px-16 py-4 items-center">
	<Icon icon="material-symbols:list" class="text-5xl md:hidden" />
	<a class="logo" href="/">
		<h1 class="hidden md:block text-3xl font-bold font-title text-darkGreen">PentaQuiz</h1>
	</a>
	<div class="flex items-center gap-24">
		<ul class="hidden md:flex gap-2 md:gap-8 text-xl">
			{#each navs as { title, href }}
				<li>
					<a {href} {title} class="hover:font-bold">{title}</a>
				</li>
			{/each}
		</ul>
		<div class="flex gap-2 md:gap-6 items-center">
			{#if user}
				<div class="w-16">
					<img src={user.avatar} alt="" />
				</div>
				<div class="">
					<button
						on:click={logout}
						class="uppercase text-white w-full py-3 px-3 rounded-md bg-secondary hover:bg-darkGreen focus:outline-none"
						>LOG OUT</button
					>
				</div>
			{:else}
				<button
					class="py-2 px-6 bg-secondary rounded-lg text-xl text-white hover:bg-buttonHover focus:outline-none"
					on:click={() => {
						window.location.href = '/login';
					}}
				>
					Login
				</button>
			{/if}
		</div>
	</div>
</nav>
