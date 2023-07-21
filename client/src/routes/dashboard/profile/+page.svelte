<script lang="ts">
	import ProfileTabs from '../../../components/userSetting/ProfileTabs.svelte';
	import type { LayoutData } from '../../$types';
	import type { ActionData } from './$types';
	export let data: LayoutData;
	export let form: ActionData;
</script>

<ProfileTabs user={data.user} {form} />
