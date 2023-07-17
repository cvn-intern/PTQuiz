<script lang="ts">
	import Icon from '@iconify/svelte';
	export let hiddenModal: boolean = true;
	import { sineIn } from 'svelte/easing';
	import { Drawer, CloseButton } from 'flowbite-svelte';
	import SidebarItem from './sidebarItem.svelte';
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
</script>

<Drawer
	transitionType="fly"
	{transitionParams}
	bind:hidden={hiddenModal}
	id="sidebarModal"
	class="w-1/2 h-full z-50"
	position="fixed"
>
	<div class="flex justify-end">
		<CloseButton on:click={() => (hiddenModal = true)} class="mb-4 dark:text-white" />
	</div>
	<a class="flex justify-center py-2" href="/">
		<h1 class="font-title text-2xl font-bold text-darkGreen">PentaQuiz</h1>
	</a>
	<div class="flex flex-col">
		<div class="overflow-y-auto py-4 rounded dark:bg-gray-800">
			<SidebarItem
				name={'My Quizzes'}
				icon={'tabler:home'}
				navigateTo={'/dashboard/quizzes'}
			/>
			<SidebarItem
				name={'History'}
				icon={'material-symbols:history'}
				navigateTo={'/dashboard/history'}
			/>
			<SidebarItem
				name={'Profile'}
				icon={'mingcute:user-setting-fill'}
				navigateTo={'/dashboard/profile'}
			/>
			<SidebarItem name={'Discovery'} icon={'mdi:world'} navigateTo={'/discovery'} />
		</div>
	</div>
</Drawer>
