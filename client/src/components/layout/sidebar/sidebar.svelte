<script lang="ts">
	import { t } from '$i18n/translations';
	import SidebarItem from './sidebarItem.svelte';
</script>

<div
	class="h-full w-full bg-white border-r border-gray-200 pb-10 dark:bg-gray-800 dark:border-gray-700 md:block hidden"
>
	<nav class="p-6 w-full flex flex-col flex-wrap gap-2">
		<SidebarItem
			name={$t('common.myQuizzes')}
			icon={'tabler:home'}
			navigateTo={'/dashboard/quizzes'}
		/>
		<SidebarItem
			name={$t('common.history')}
			icon={'material-symbols:history'}
			navigateTo={'/dashboard/history'}
		/>
		<SidebarItem
			name={$t('common.profile')}
			icon={'mingcute:user-setting-fill'}
			navigateTo={'/dashboard/profile'}
		/>
	</nav>
</div>
