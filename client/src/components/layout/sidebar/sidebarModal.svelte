<script lang="ts">
	export let hiddenModal: boolean = true;
	import { sineIn } from 'svelte/easing';
	import { Drawer, CloseButton } from 'flowbite-svelte';
	import SidebarItem from './sidebarItem.svelte';
	import { t } from '$i18n/translations';
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
	import logo from '$assets/logo.png';
	import type { LayoutData } from '../../../routes/$types';
	export let user: LayoutData;
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
		<CloseButton on:click={() => (hiddenModal = true)} class=" dark:text-white" />
	</div>
	<a class="flex justify-center py-2" href="/">
		<img src={logo} alt="logo" class="w-32" />
	</a>
	<div class="flex flex-col">
		<div class="overflow-y-auto py-4 rounded dark:bg-gray-800">
			{#if user}
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
				<SidebarItem
					name={$t('common.discovery')}
					icon={'mdi:world'}
					navigateTo={'/discovery/All'}
				/>
			{:else}
				<SidebarItem
					name={$t('common.discovery')}
					icon={'mdi:world'}
					navigateTo={'/discovery'}
				/>
			{/if}
		</div>
	</div>
</Drawer>
