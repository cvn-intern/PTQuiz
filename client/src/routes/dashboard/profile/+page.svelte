<script lang="ts">
	import Sidebar from '../../../components/layout/sidebar/sidebar.svelte';
	import ProfileTabs from '../../../components/userSetting/ProfileTabs.svelte';
	import type { LayoutData } from '../../$types';
	import { setContext } from 'svelte';
	import type { ActionData } from './$types';
	export let data: LayoutData;
	export let form: ActionData;
	$: setContext('form', form);
</script>

<ProfileTabs user={data.user} {form} />
