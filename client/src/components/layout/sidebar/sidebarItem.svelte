<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';

	export let name: string;
	export let icon: string;
	export let navigateTo: string;
	const dispatch = createEventDispatcher();

</script>

<button
	aria-label={name}
	class={clsx(
		'flex items-center gap-x-3.5 py-2 px-2.5 text-base text-slate-700 rounded-md dark:bg-gray-900 dark:text-white cursor-pointer w-full',
		{
			'bg-secondary dark:bg-darkGreen text-white hover:bg-secondary':
				$page.url.pathname.includes(navigateTo),
			'hover:bg-primary dark:hover:bg-darkGreen': $page.url.pathname !== navigateTo
		}
	)}
	on:click={() => {
		dispatch('close',{
			hiddenModal: true
		});
		navigateTo ? goto(navigateTo, { replaceState: true }) : null;
	}}
>
	<Icon {icon} class={'text-xl'} />
	{name}
</button>
