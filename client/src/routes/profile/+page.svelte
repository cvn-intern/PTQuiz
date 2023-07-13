<script lang="ts">
	import Sidebar from '../../components/layout/sidebar.svelte';
	import ProfileTabs from '../../components/userSetting/ProfileTabs.svelte';
	import type { LayoutData } from '../$types';
	import type { ActionData } from './$types';
	import { setContext } from 'svelte';
	export let data: LayoutData;
	export let form: ActionData;
	$: setContext('form', form);
</script>

<div class="flex gap-6">
	<div class="xl:w-2/12 lg:w-3/12 md:w-4/12">
		<Sidebar />
	</div>
	<div class="xl:w-10/12 lg:w-9/12 md:w-8/12 sm:w-full w-full">
		<ProfileTabs user={data.user} form={form} />
	</div>
</div>
