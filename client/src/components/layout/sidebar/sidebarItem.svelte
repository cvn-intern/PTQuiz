<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import clsx from 'clsx';

	export let name: string;
	export let icon: string;
	export let navigateTo: string;
</script>

<button
	aria-label={name}
	class={clsx(
		'flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-md hover:bg-secondary dark:bg-gray-900 dark:text-white cursor-pointer w-full',
		{
			'bg-secondary dark:bg-darkGreen': $page.url.pathname === navigateTo,
			'hover:bg-secondary dark:hover:bg-darkGreen': $page.url.pathname !== navigateTo
		}
	)}
	on:click={() => {
		navigateTo ? goto(navigateTo, { replaceState: true }) : null;
	}}
>
	<Icon {icon} class={'text-xl'} />
	{name}
</button>
