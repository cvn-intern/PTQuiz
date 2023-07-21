<script lang="ts">
	import SidebarItem from './sidebarItem.svelte';
</script>

<div
	class="h-full w-full bg-white border-r border-gray-200 pb-10 dark:bg-gray-800 dark:border-gray-700 md:block hidden"
>
	<nav class="p-6 w-full flex flex-col flex-wrap gap-2">
		<SidebarItem name={'My Quizzes'} icon={'tabler:home'} navigateTo={'/dashboard/quizzes'} />
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
	</nav>
</div>
