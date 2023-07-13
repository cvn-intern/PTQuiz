<script>
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
			href: '/dashboard'
		}
	];
	import Icon from '@iconify/svelte';
</script>

<nav class="navbar bg-primary w-full flex justify-between px-2 lg:px-16 py-4 items-center">
	<a class="logo" href="/">
		<h1 class="text-3xl font-bold font-title text-darkGreen">PentaQuiz</h1>
	</a>
	<div class="flex items-center gap-24">
		<ul class="hidden md:flex gap-2 md:gap-8 text-xl">
			{#each navs as { title, href }}
				<li>
					<a {href} {title} class="hover:font-bold">{title}</a>
				</li>
			{/each}
		</ul>
		<div class="flex gap-2">
			<button
				aria-label="Close a popup"
				class="py-2 px-6 bg-secondary rounded-lg text-xl text-white hover:bg-buttonHover"
				on:click={() => {
					window.location.href = '/login';
				}}
			>
				Login
			</button>
			<Icon icon="material-symbols:list" class="text-5xl md:hidden" />
		</div>
	</div>
</nav>
