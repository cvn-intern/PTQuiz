<script lang="ts">
	import ProfileTabs from '$components/userSetting/ProfileTabs.svelte';
	import Toast from '$components/toast.svelte';
	export let data;
	export let form: any;
</script>

<Toast {form} />
<ProfileTabs user={data.user} {form} />
