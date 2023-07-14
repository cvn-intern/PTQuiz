<script>
	import Icon from '@iconify/svelte';
	const levels = [
		{
			name: 'Home',
			url: '/',
			icon: 'material-symbols:home-outline'
		},
		{
			name: 'Templates',
			url: '#'
		},
		{
			name: 'Flowbite',
			url: '#'
		}
	];
</script>

<nav
	class="flex justify-center px-5 py-3 text-gray-700 bg-transparent dark:bg-gray-800 dark:border-gray-700 text-base"
	aria-label="Breadcrumb"
>
	<ol class="inline-flex items-center space-x-1 md:space-x-3 ml-10">
		{#each levels as level, i}
			{#if i !== levels.length - 1}
				<li class="inline-flex items-center">
					<a
						href={level.url}
						class="inline-flex items-center font-medium text-gray-700 hover:text-secondary dark:text-gray-400 dark:hover:text-white"
					>
						{#if level.icon}
							<Icon icon={level.icon} class={'text-2xl'} />
						{/if}
						{level.name}
					</a>
					<Icon
						icon="eva:arrow-ios-forward-outline"
						class="inline-flex w-5 h-5 mx-2 text-gray-400"
					/>
				</li>
			{:else}
				<li aria-current="page">
					<div class="flex items-center">
						<span class="font-medium text-gray-500 md:ml-2 dark:text-gray-400"
							>{level.name}</span
						>
					</div>
				</li>
			{/if}
		{/each}
	</ol>
</nav>