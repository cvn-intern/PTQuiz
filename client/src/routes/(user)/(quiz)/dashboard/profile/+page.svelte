<script lang="ts">
	import ProfileTabs from '$components/userSetting/ProfileTabs.svelte';
	import type { ActionData } from './$types';
	export let data;
	export let form: ActionData;
</script>

<ProfileTabs user={data.user} {form} />
